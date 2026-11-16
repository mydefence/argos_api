# Argos Application Note: Vehicle System

This application note is intended for 3rd party integrators using the [Argos
API] to integrate MyDefence sensors and optionally MyDefence effectors into a
vehicle.

This application note is not intended to be used stand-alone, but as a
supplement to [Argos API] documentation. Familiarity with the [Argos API] is
assumed in the following.

In the following Argos messages will be listed as follows.
```text
    -> event from Argos
    <- request to Argos from integration
```

The messages do not necessarily include all required parameters, only the most
relevant. Refer to [Argos API] for full description of the messages used and
error handling.

All operations may be performed using MyDefence's C2 web front-end Iris, which
is available on all Argos servers. E.g. it may save development effort to not
implement the [assembly](#assembly)/[maintenance](#maintenance) procedures, but
use Iris for this. Iris also offers a very nice vehicle mode, but if you are
reading this document, you have probably decided not to use that. Iris can be
run in parallel to your own integration, which may be helpful during
development.

## Assembly

The following is assumed (outside the scope of this document): All devices and
Argos server are connected to the same network with appropriate IP
configuration.

### Device List

On first connection to Argos, you should query for already discovered devices;

```text
    <- deviceGetList()
    -> deviceList([])
```

### Discovery

When devices are powered on, they will be auto-discovered by Argos:

```text
    -> deviceAdded(deviceId, deviceSerialNumber, deviceMounted=false)
```

Wait for all devices to be discovered. If that does not happen within 20 seconds
check wiring/IP configuration.

### Upside-Down

If it was necessary to mount any sensors upside-down, this must be configured (before creating the composite device):

```text
    <- deviceMiscellaneousChange(deviceId,
            deviceMiscellaneousType='deviceOrientation',
            deviceMiscellaneousData.deviceOrientation=180)
    -> deviceMiscellaneousChangeCompleted
```

### Composite Device

The sensors must be added to a generic composite device with appropriate
headings relative to the vehicle's front-facing direction. Typically, but not
required, the WD150 will be mounted with a relative heading of 0, and the
remaining approximately equidistant around the vehicle.

Ensure to note down the serial numbers of the WD250 units and their mounted
position, so you know which devices to assign which heading. The headings in the
following is just an example:

```text
    <- compositeDeviceAdd(deviceType='composite', deviceVersion=0,
            devices=[{ deviceId='id for WD150', heading=0 },
                     { deviceId='id for WD250-1', heading=45 },
                     { deviceId='id for WD250-2', heading=135 },
                     { deviceId='id for WD250-3', heading=225 },
                     { deviceId='id for WD250-4', heading=315 }])
    -> compositeDeviceAddCompleted(deviceId)
```

The WD150 must be first in the list (See [Enable GPS](#enable-gps)).

If the system also contains RF effectors, you may include these in the same
composite device as the sensors, or create a separate composite for them. The
headings of the effectors are important, because the information is used when
distributing jamming frequencies.

In the following sections `deviceId` always refers to the device ID of the
composite as returned in `compositeDeviceAddCompleted` unless otherwise noted.

### Mount

The device is ready to be mounted in Argos. That will be followed by
`deviceUpdated` messages each time one of the child devices changes connection
state. The final `deviceUpdated` must mark the composite device as `connected`,
otherwise there is a connection issue. This should take a few seconds.

```text
    <- deviceMount(deviceId)
    -> deviceMountCompleted
    -> deviceUpdated(deviceId, deviceState='connecting', devices=[...])
    -> ...
    -> deviceUpdated(deviceId, deviceState='connected', devices=[...])
```

The state of each child device can be inspected in the `devices` array.

### Enable GPS

_If_ you will be using the WD150 for GPS position and compass heading, this must be enabled. Some
times higher quality sensors are available on the vehicle, in which case it is highly recommended to
use these, see [Use Vehicle's Position and Heading](#use-vehicles-position-and-heading).

```text
    <- deviceMiscellaneousChange(deviceId,
            deviceMiscellaneousType='useGPSLocation',
            deviceMiscellaneousData.useGPSLocation=true)
    -> deviceMiscellaneousChangeCompleted
```

Remember deviceId refers to the composite device. The device used for
GPS/compass is always the first child device of the composite.

Note, this enables use of both compass and GPS from the WD150. They cannot be
en-/disabled individually.

Note, that WD150 compass requires the vehicle to drive in circles while enabling calibration after
mounting.

## Operation

All configuration done in [Assembly](#assembly) phase is saved, so when the
system is powered up, you only need to wait for it to become active. Check
[current state](#device-list) of the composite device and [wait](#mount) for it
to be `connected`.

A strategy must be chosen for handling of location and heading:

1. Use WD150 GPS and compass. See [Enable GPS](#enable-gps), [Compass
   Calibration](#compass-calibration)
2. Use the vehicle own GPS position and compass heading. Do _not_ [Enable
   GPS](#enable-gps).

### Mission Center

Earlier versions of this document described setting mission center. As of Argos release 6.3.0 this
is no longer required.

### Compass Calibration

If you did [enable GPS](#enable-gps) you need to calibrate the compass,
otherwise you can skip compass calibration.

First time the compass is used it needs to be calibrated. The WD150 will
indicate that calibration is required until its first calibration. It may at any
time also indicate a need to be re-calibrated, in this case it will continue to
work, but precision may be degraded.

In addition changes in the compass' environment (in particular metal) might make
it necessary to re-calibrate, so there should be a way for the operator to
re-initiate calibration if he notices error in the heading.

If calibration is required it will be shown in the device information for WD150
child device.

```text
    -> deviceUpdated(deviceId,
            devices[0].deviceCalibration.compass='uncalibrated')
```

Initiate calibration procedure:

```text
    <- deviceCalibrationStart(deviceId='id of WD150 child device',
            calibrationType='compass')
    -> deviceCalibrationStartCompleted()
    -> deviceUpdated(deviceId,
            devices[0].deviceCalibration.compass='calibrating')
```

During calibration vehicle must drive in a 360 degrees circle, until calibration
completes.

```text
    -> deviceUpdated(deviceId,
            devices[0].deviceCalibration.compass='calibrated')
```

Location and heading will regularly be reported:

```text
    -> deviceLocationChanged(deviceId, deviceLocationLatitude,
            deviceLocationLongitude, deviceLocationHeading,
            deviceLocationX, deviceLocationY)
```

### Use Vehicle's Position and Heading

#### Using NMEA Source

If your vehicle has some GPS receiver, that can provide GPS information in NMEA format, this is the
recommended configuration.

1. Add a GPS device from the devices menu providing the IP address of the GPS receiver. The IP
   address is of the form `a.b.c.d` or `a.b.c.d:port`. Mount the device, and verify it is positioned
   and headed as expected.
2. Add the GPS device to the composite, and verify that it is the composite's selected GPS source.
    Only the selected GPS source contributes to the composite location.
3. Enable GPS on the composite as described in [Enable GPS](#enable-gps).

Supported protocols are listed [here](https://www.npmjs.com/package/gps). Typical message would be
`$GNGGA` and `$GNHDT`.

#### Using Argos Location API

If you did _not_ [enable GPS](#enable-gps), then you need to manually update
heading and position. It is recommended to do this 1-2 times/sec:

```text
    <- deviceLocationChange(deviceId,
          deviceLocationType='deviceGeolocation',
          deviceLocationLatitude, deviceLocationLongitude, deviceLocationHeading)
    -> deviceLocationChangeCompleted
```

Lat/lon and heading may be set in different messages if preferred. If using a
separate composite for effectors, it is _not_ required to keep its location
updated. Heading is relative to true north.

### Monitor Operational State

If a device is not running, the composite device state will change to
`connecting`. You may inspect the child devices of the composite to determine
which is the cause:

```text
    -> deviceUpdated(deviceId, deviceState='connecting',
            devices[n].deviceState='connecting')
```

Note, that the other child devices that are in `connected` state will still be
functioning, so the system is still useable, but with reduced functionality.

Connection issues are also reported using the system log interface along with
various other issues, such as missing GPS signal or high RF interference:

```text
    -> systemLog(deviceId,
            description='Missing connection to 1 of 5 sub-devices.',
            severity='error')
```

### Drone Threats

All drone threats are reported using `uthreat` events:

```text
    -> uthreat()
```

Note, the 4 different threat types: Presence, Zone, Direction, and Location.
Location is used with Drone ID, the other with various other RF signals.

Refer to [Argos API] if you are interested in threat muting features (`uthreatSetMute`, `threatTypeMute`).

### Activate Jamming

You may configure Argos to automatically start jamming:

```text
    <- ecmConfigure(autoStart: 'all', autoFreq: 'allowGnss')
```

Jamming can also be controlled manually

```text
    <- deviceMiscellaneousChange(deviceId,
            deviceMiscellaneousType='frequencyBands',
            deviceMiscellaneousData.currentBands=["GNSS","2G4"])
    -> deviceMiscellaneousChangeCompleted
    <- ecmStart(deviceId)
    -> ecmStartCompleted
```

### (A)TAK Integration

If your vehicle can access a TAK server, you may be interested in connecting
to that. Argos will share vehicle position and drone threats.

```text
    <- takConfigure(callsign='my vehicle', vehicleDeviceId=deviceId,
            sendLocations=false, sendThreatDetails=false, transports=...)
    -> takConfigureCompleted(...)
```

If you do _not_ want threats from the TAK server to appear as `uthreat` events,
you should set `transports[].options.direction='output'`.

## Maintenance

### Replace a Device

If a defective device is replaced, the composite device can be edited:

```text
    <- deviceCompositeEdit(deviceId, devices=[..., {deviceId, heading, replacesDeviceId}, ...])
    -> deviceUpdated({deviceId, ...})
    -> deviceCompositeEditCompleted()
```

`devices` is the complete list of all devices in the updated composite. The property
`replacesDeviceId` should be set for the changed child device. Also make sure to not change the
order of devices, as that determines GPS source.

## Firmware Update

Do _not_ implement the firmware update interface in [Argos API]. It is
deprecated and will be phased out.

Instead connect a PC running [MyDefence Device Manager] to the vehicle
network, and use it to update the devices.

[Argos API]: https://github.com/mydefence/argos_api
[MyDefence Device Manager]: https://download.mydefence.dk/mddevmgr/latest/
