# Release Notes ARGOS

## 5.3.0

### Attention

-   API: Added `CoT` to uthreat and uthreatBasis property `detectionType` for
    Cursor-on-Target originated threats.
-   API: Added deviceType `tak` TAK device, e.g. ATAK (Android Tactical
    Awareness Kit). Also added new createdBy `extern` currently only used with
    TAK devices.
-   API: UthreatBasisLocation may now also contain `rfInfo` property
-   API: Added deviceMiscellaneousType `takInfo`.

### Improvements

-   (A)TAK/CoT support. Support sending and receiving drone-related CoT
    messages. Support for broadcast, TCP, and TLS as CoT transports. See new API
    events `takConfig*` and `takTransport*`.
-   SkyEye update to support 5.2GHz jamming (6 channel jammer). All jamming
    frequencies are now considered independent. The earliest SkyCope effectors
    had some hardware constraints, that were modelled in the SW, this is now
    removed. The required SkyEye API version is 4.2. Tested with SkyEye SW
    V4.3.2.3114.

### Bugs
-   fix missing followUthreatId in ptzFollowStarted message

## 5.2.0

### Attention

-   API
    -   Optional field `startTime` removed from `systemState`
-   Support for OpenWorks Vision Flex camera V1 API removed

### Improvements

-   Support for CircleScope tracker
-   Support for OpenWorks Vision Flex camera V2 API
-   Discover composite devices even if some child is not working. Wolfpack and
    Dobermann Dual/360 devices will be added to the device list after discovery
    of the first child (used to be after discovery of all children). This makes
    it possible to use and debug partially functioning composites.
    -   There are no schema changes related to this, but expect child device to
        have `deviceIP`=`null` and `deviceSerialNumber`=`""`, which did not
        happen previously.
-   API
    -   New `deviceMiscellaneousType` for setting profile of a device:
        `deviceMiscellaneousProfiles`. If a device supports profiles - e.g.
        "longRange" or "shortRange" - then these can be read and the active
        profile set through this miscellaneous object.
    -   New `streamDetails` in `vmsStreamList` elements, with properties
        describing e.g. resolution, frames per second, etc.
    -   New `detectionType` "Vision" in `uthreat` schema to be used in uthreats
        from cameras capable of detection/classification.
-   EchoShield: Add warning if configured tilt/roll differs significantly from
    the values reported from internal INS.
-   Sapient ASM support version BSI Flex 335 v2.0 / NATO STANREC 4869 draft 6.
    TIE-24 interoperability tested. Sapient is not enabled per default, contact
    MyDefence for information on how to enable.ptyp

### Bugs

-   GroundAware radar service was reset causing tracks to disappear at irregular
    interval. Issue introduced in v5.0.0.
-   Fix VMS streams handling for composite devices with a camera.
-   EchoShield: If useGPSLocation was enabled when radar did not have GPS fix,
    latitude/longitude could be set to the string `nan`, which violates the API,
    and caused several critical issues.
-   Jaegar and VisionFlex camera PtzDeviceInfo fixed. Zoom `pct` = 1 is maximum
    zoom (low field-of-view) and `pct` = 0 is minimum zoom (high field-of-view).
-   EchoShield: Various bug fixes (merged from 4.4.3)

## 5.1.0

### Improvements

-   Recording of RF sensor data. For providing data to MyDefence to improve
    existing detectors or aid implementation of new ones. Contact Mydefence for
    instructions on how to enable the feature.
-   Auto-remove of unused auto-discovered devices.

### Bugs

-   Fix FWU of devices in `updateable` state.

## 5.0.1

### Bugs

-   Interface example fixes. Some package dependencies were not at correct
    version, and description of install procedure was incomplete.

## 5.0.0

### Attention

-   API **BREAKING CHANGE**: DeviceMiscellaneousInfo and
    DeviceMiscellaneousChange has been split into separate schemas, so it is
    clear

    -   which properties are always present in Info messages, and
    -   which properties cannot be set form the client
        > In particular this affects `deviceMiscellaneousType`
        > "frequencyBands". Properties `frequencyBands` and
        > `numSimultaneusBands` used to be required, but are now disallowed
        > in DeviceMiscellaneousChange.

-   API: Device schema updates
    -   `minAngle`, `maxAngleFallback` and `noAngleFallback` removed from
        `deviceAttributes`.
    -   `maxAngle` is now set for all leaf devices to represent their coverage
        area.
    -   `createdBy` is now mandatory.
    -   Deprecation notice removed from `deviceAttributes.deviceHeading`
    -   Deprecation notice added to `deviceState` "created". "disconnected" will
        be used in its place.
    -   Added optional `deviceCalibration` property.
-   API: deviceLocationChange no longer allows setting `deviceLocationLatitude`
    or `deviceLocationLongitude` on child devices. It never had any effect.
-   Auto-generated typescript types are now placed in a file named `argosApi.ts`
    instead of `argos-api.ts`.
-   RF Sensor SW version 2.15.x is not supported due to an API change. Both
    older and newer versions may be used. The release is tested with 2.16.0.

### Improvements

-   API: New `deviceType` "lizardEar" in `device` schema.
-   API: New `detectionType` "Audio" in `uthreat` schema to be used in uthreats
    from audio sensors like LizardEar.
-   API: compositeDeviceAdd can be used to group any devices into a generic
    composite when using the new `deviceType` "composite". This includes making
    composites of composites.
-   When deleting a composite device, children will be restored in unmounted
    state. The exception is auto-discoverable children, which will be deleted,
    but reappear shortly after if still present (unchanged behavior).
-   Improve zone selection in Wolfpack / Watchdog composite device. This
    improves some scenarios where threat direction would flicker between the
    internal zones.
-   API: deviceCalibrationStart can be used to initiate calibration. Currently
    it is possible to calibrate compass of WolfPack and WD150 devices.
-   node.js API interface example code rewritten.

## 4.4.4

### Improvements

-   SkyEye update to support 5.2GHz jamming (6 channel jammer). All jamming
    frequencies are now considered independent. The earliest SkyCope effectors
    had some hardware contraints, that were modelled in the SW, this is now
    removed. The required SkyEye API version is 4.2. Tested with SkyEye SW
    V4.3.2.3114.

## 4.4.3

### Bugs

-   EchoShield: Fix bug in handling of heading.

### Attention

-   EchoShield: The radar should be configured with correct height. This implies
    that all Argos devices should use EGM96 height, if an EchoShield device is
    used. EchoShield devices now also reports their GPS height (EGM96) in device
    location when useGPS is enabled.

## 4.4.2

### Bugs

-   EchoShield: If useGPSLocation was enabled when radar did not have GPS fix,
    latitude/longitude could be set to the string `nan`, which violates the API,
    and caused several critical issues.

## 4.4.1

### Bugs

-   Fix issue with Jaegar camera intitialization.

## 4.4.0

### Bugs

-   User modified threat confidence threshold for composite radar devices were
    not used after ARGOS restart.

## 4.4.0

### Attention

### Improvements

-   auto jamming: Ignore muted threats.
-   handle drone ID from DJI (tested with DJI Mavic 3 Classic and DJI Air 3)
-   API: Added `confidenceThresholdMax` to
    DeviceMiscellaneousConfidenceThreshold.
-   Support for Echodyne EchoShield radar
-   Support for OpenWorks Vision Flex camera
-   Support for Weibel XENTA-C radar (asterix protocol). Support was actually
    included in 4.3.0 but had not been validated, and was therefore not
    announced.
-   SkyEye support updated to SkyEye API version 4.1. This has been tested with
    SkyEye SW version 4.2. ARGOS will no longer work with SkyEye SW version 4.0
    or earlier.
-   Sapient v7 ASM support. Tie2023 interoperability tested. Sapient is not
    enabled per default, contact MyDefence for information on how to enable.

### Bugs

-   In Device schema changed `heading` from integer to number. `heading` could
    have a decimal part, and this matches the rest of the schemas.

## 4.3.0

### Attention

-   APS radar: API version 0.x is no longer supported. You will need to upgrade
    the radar to use this release.
-   DeviceType API update: New deviceCategory `detectorEffector` introduced for
    devices that combine drone detection and jamming.
-   The properties `eventPostExtension`, `source`, and `onlyEvent` in the API
    schema has not been used for some time. They are now marked deprecated, and
    will be removed in the future.
-   The DeviceMiscellaneousInfo type `trackThresholds` has been removed. It has
    not been used since release 4.0.0.

### Improvements

-   API: devices: Minor cleanup in CompositeDeviceAdd and DeviceAdd
-   API: frequencyBands added to UthreatHistory elements
-   Support for Weibel Xenta-C radar (asterix interface)
-   APS radar: Support for API version 1.x.
-   APS radar: Display overload information in system log.
-   APS radar: Improved handling of tracks disappearing shortly.
-   SkyCope SkyGuard supported. The support is integrated in the SkyEye asset
    service, and enabled by selecting deviceVersion=2.
-   Silent Sentinal Jaegar: stability improvements regarding connection
    management

### Bugs

-   Blackbird PTZ rotators accepted but ignored commands to move during its
    initialization sequence. The commands are now stored until initialization
    completes.
-   Drone ID: Fix some scenarios with garbage characters in threat description.
-   Drone ID: Handle a drone ID transmitter could change MAC address.

## v4.2.2

### Improvements

-   Bug fix to RF geolocation of watchdog devices. Headings were some times not
    handled correctly resulting in no geolocation in some cases.

## v4.2.1

### Improvements

-   Minor stability fixes to Echoguard asset service.

## v4.2.0

### Attention

-   API for deviceMiscellaneous data changed. The property deviceParentId has been
    removed. Clients should maintain a mapping of parent and child devices.

### Improvements

-   Optimization of sensor fusion handling of threats that are active, but do
    not have a recent position update.
-   Support for Direct Remote ID (a.k.a. drone ID) as a source of location
    information for drones and controllers. Supported DRID transports depend on
    the sensors.
    -   Added new uthreat detectionType `"Drone ID"`
    -   Added new uthreat fields `associatedUthreatId` and `operationalStatus`.
-   Sapient integration. Connections to Sapient endpoints can be configured for
    sensor and effector devices. See API description in interface specification.
-   New SystemLog API added: Note that system events are pushed to connected
    clients. See interface specification for more information.
-   Improved EchoGuard handling

## v4.1.1

### Bugs

-   Startup device sanity check now removes dangling child devices if parent
    device does not exist.
-   The origin filter objects could contain an extra property, resulting in
    rejection due to schema violation if the object was modified and sent back.
-   Fix wd200 (Watchdog/Wolfpack) did not correctly report 'connecting' state.
-   emitterId in uthreats was not correct, making it impossible to do manual
    pairing of uthreats when sensor fusion was off.
-   Fix issue regarding devices not connecting correctly after system restart.
    This could happen for wd200 devices that were connected when system was
    powered off.

## v4.1.0

-   Allow unmounting children in composite devices. This can e.g. be used to
    disable jamming in certain directions on a Dobermann 360, or disable
    detection in a direction on a Wolfpack located near a reflective wall.
-   Optimizations to get threat locations more often instead of directions. This
    means we now accept higher uncertainty in locations.
-   Added support for Regulus Ring ECM devices.
-   Improved display of SkyEye AI threats.

### Bugs

-   Fix error when removing an FWU image. Image was not removed from backend and
    reappeared at Argos restart.
-   Fix error that caused uthreatGetHistoryData requests to timeout (reply size
    was larger than socket.io limit)
-   Fix bug regarding handling of direction changes on children of composite
    devices in rf-geolocation.
-   APS radar: Fix handling of heading

## v4.0.1

### Bugs

-   Fix error where auto jamming did not stop. Happened with auto jamming
    without auto frequency.
-   Fix error with selecting the correct frequencies with auto jamming on a zone
    and auto frequencies.

## v4.0.0

### Attention

-   The adapter API, which enabled WebSocket connections to ARGOS (as opposed to
    the preferred socket.io connections) has been removed. To our knowledge it
    was not actively used.
    -   If you were using this, and cannot convert to socket.io, please contact
        MyDefence.
-   Support for first generation MyDefence products removed. This is Watchdog v1
    and Eagle v1.
-   The old threat APIs threat*, and rfGeoThreat* (deprecated since 3.0.0) have
    been removed. Please migrate to the uthreat API.

### Improvements

-   Added support for APS radars.
-   Added radar origin filters. Use this to filter false radar tracks
    originating in well defined zones. See the interface specification for
    details.
-   ptzDeviceInfo: Added field `vfov` (vertical field of view).
-   Added droneConfidenceThreshold to UthreatConfig (see schema)
-   Added aboveConfidenceThreshold to UthreatHistory (see schema)
-   Sensor fusion is now default activated in a new system.
-   Confidence values from the individual devices are now mapped to deviceType
    specific intervals when entering the stack. These intervals all have a
    maximum value below 1.0. When detections from multiple devices are fused the
    confidence value of the resulting uthreat rises above these deviceType
    specific maximum values. The mappings are:
    -   Watchdog/Wolfpack: [0.9]
    -   SkyEye: [0.8]
    -   APS: [0.75..0.85]
    -   Echoguard: [0.0..0.75]
    -   Groundaware: [0.0..0.50]

## v3.0.2

### Bugs

-   Fixed errors when processing Wifi threats from composite devices (e.g.
    Wolfpack).

## v3.0.1

### Bugs

-   Change default sensor fusion level to 'rf'.

## v3.0.0

2022-07-07

### Attention

-   The introduction of the unified threat (uthreat) API introduces breaking
    schema changes to the following events:
    -   ptzFollowStart, ptzFollowed, ptzFollowList: `rfGeoThreatId` and
        `threatId` have been replaced by `uthreatId`.
    -   Alarm{Started,Updated,Stopped} has field `threatIds` renamed to `uthreatIds`
    -   AlarmZone{Add, Update, Remove, GetList} APIs restructured
-   Other schema changes:
    -   Format 'date-time' introduced in TimeInterval.
    -   `updating` added to DeviceState
-   The old threat APIs threat*, and rfGeoThreat* are now **DEPRECATED**, and will
    be removed in 4.0.0. Please migrate to the uthreat API.

### Improvements

-   This release features the introduction of the new unified threat API
    (uthreat). See the interface specification for details.
-   With this release it is possible to fuse RF and Radar tracks (full sensor
    fusion). See the uthreat API for details. This feature is default disabled.
    **_RF-radar fusion is beta maturity_**. Feel free to play with it and
    integrate towards it, but it is **_not tested for production quality_** yet.
-   ptzMoveAbs height is now optional
-   New feature list API added: featureGetList, featureList to inform about
    available features, e.g. radar support. See interface specification for more
    information.
-   The sample program in the documentation package is now written in
    typescript, and includes typescript types for the ARGOS API.

### Bugs

## v2.9.1

2022-03-22

### Bugs

-   Jaegar - fix enabling focus assist
-   Fix use GPS location for joined devices
-   ptzDeviceUpdate: Properties with value 0 were not correctly reported

## v2.9.0

2022-03-01

### Attention

-   ARGOS requests not complying to the API schema are now rejected with an
    apiError event!

### Improvements

-   ARGOS requests not complying to the API schema is now rejected with an
    apiError event. This is done to protect ARGOS against crashes due to
    malformed requests. It can (but generally should not) be disabled by setting
    environment SCHEMA_CHECK_IN=0 if the client can for some reason not be fixed.
-   Added apiError event
-   Extraneous properties removed from the common message structure (no schema
    change).
-   Support for Skycope SkyEye RF detector
-   Support for Blackbird 5K RF effector
-   PTZ API update (primarily for better camera support):
    -   Added ptzDeviceInfo, ptzGetDeviceList, ptzDeviceList, ptzDeviceUpdate,
        ptzDeviceSet
    -   Add focus to ptzMoveAbs/ptzMoveSetVelocity
    -   Add videoSubDeviceId to vmsStreamList to distinguish camera tubes
    -   ptzPayloadLocation removed from deviceLocationChanged (info is now in
        ptzDeviceInfo)
-   Added API for getting ARGOS features

### Bugs

-   Schema file changes:
    -   Schema fixes to make Argos comply with own standard
    -   Properties in DeviceMiscellaneousPtzLimits made optional and max/min values
        can now be set to null to disable the limit
    -   Some properties of CompositeDeviceAdd no longer required, and deviceParentId
        is marked deprecated.

## v2.8.2

2022-01-14

### Bugs

-   EchoGuard settings would be defaulted upon connecting to the panel. No
    settings would be applied to the panel. Bug introduced in v2.8.0

## v2.8.1

2021-11-08

### Bugs

-   Migration of old map center to new mission center did not work

## v2.8.0

2021-10-28

### Attention

-   Updating to this release will delete threat and rfGeoThreat history from the
    database. If needed this information should be downloaded (e.g. through the
    Iris report) before performing the update.
-   Mission center has to be set via the missionCenterSet API, before rfGeoThreats
    are evaluated.

### Improvements

-   New frequency information fields in threat messages. 'possibleBands' lists
    all the frequency bands a threat can use, and 'frequencyBands' indicate on
    which bands the threat is currently being observed. These new fields replace
    the fields 'frequency' and 'frequencyBand' for threats and the field
    'frequencyInfo' for rfGeoThreats. As a result schema files has changed.
-   New API for setting and getting mission center. An integrator can use this
    when e.g. displaying maps, but it is also used internally when evaluating the
    automatic ECM functionality and when generating rfGeoThreats.
-   EchoGuard supports pitch and roll mounting angles
-   New API for video management
-   EchoGuard supports pitch and roll mounting angles
-   PTZ API expanded to include setting velocity and position of PTZ devices.
-   Support for ONVIF camera devices
-   ARGOS now offers HTTPS socket.io interface on port 5051. HTTP interface is
    unchanged on port 5050. To use it you need to install a new root certificate
    authority (CA) on the clients. See ArgosInterfaceSpecification.pdf.

### Bugs

-   Schema file changes:
    -   DeviceLocationChange and Device.deviceAttributes corrected
    -   various minor syntax fixes

## v2.7.2

2021-08-24

### Bugs

-   Blackbird jammer wouldn't start on 433 and GNSS frequency bands

## v2.7.1

2021-08-12

### Bugs

-   Schema files for alarm zone api corrected
-   Auto jam bug fix regarding handling of multiple threats
-   Auto jam bug fix regarding handling of Dobermann 360
-   Auto jam bug fix regarding allowGnss mode

## v2.7.0

2021-06-21

### Improvements

-   API changed regarding alarm zones. Event names changed
-   Added first version of RF fingerprinting. This enables better handling of
    multiple threats of the same type.
-   Added PTZ service and API for tracking location threats with PTZ capable
    devices.
-   Added support for Dobermann360 device
-   Added support for joining three Groundaware panels to one groundawareTrio
    composite device
-   Added support for joining four Echoguard panels to one echoguardQuad
    composite device
-   Added support for automatically starting jamming, and automatic selection of
    jamming frequencies
-   Added support for retrieving history of ECM activation

### Bugs

-   Handling of deviceOrientation (device mounted upside down)

## v2.6.4

2021-06-03

### Improvements

-

### Bugs

-   Various bugfixes for Echoguard asset service

## v2.6.3

2021-04-20

### Improvements

-

### Bugs

-   Groundaware could cause exceptions under certain conditions

## v2.6.2

2021-04-19

### Improvements

-   Blackbird service can read tilt limits from environment

### Bugs

-   Groundaware service did not shut down properly when unmounting
-   Groundaware service could leave alerts hanging
-   fix elevation control in camera asset service

## v2.6.1

2021-03-11

### Improvements

-

### Bugs

-   Fix for pan degree outside +/- 360

## v2.6.0

2021-02-26

### Improvements

-   RF Geo-location: An additional layer fusing threats from individual RF
    sensors into a single rfGeoThreat message. Where two or more line-of-bearing
    detections intersect a location and track is formed when detection quality is
    sufficient.
-   Alarm zones can be created and radar threats and rfGeoThreat with location
    information generate alarms when threat position is inside an alarm zone.
-   getVersions/versions API removed. getSystemState/systemState provides the
    same.
-   Dynamic treatTypes pulled from mounted devices
-   Added Echoguard device
-   Added Groundaware device
-   Added Blackbird device
-   Reworked ECM interface

### Bugs

-

## v2.5.0

2020-12-14

### Improvements

-   Support for muting by threatType

### Bugs

-   frequencyBand decoding for lower frequency bands (433, 868, 1G2)

## v2.4.1

2020-11-06

### Improvements

### Bugs

-   Status timer was not restarted after reconnection in WD200 asset service

## v2.4.0

2020-10-23

### Improvements

-   Device software version in messages related to devices
-   FWU of RF sensor and RF effector devices

### Bugs

## v2.3.2

2020-10-01

### Improvements

### Bugs

-   wrong start of Dobermann GNSS jamming
-   Reconnect issue

## v2.3.1

2020-09-10

### Improvements

### Bugs

-   Composite devices could not be updated after GPS location update

## v2.3.0

2020-08-20

### Improvements

-   Added support Dobermann Dual
-   "productName" in miscellaneous data
-   "deviceName" now initialized to "productName"

### Bugs

-   Better handling of socket connections to devices (timeouts, reconnects)

## v2.2.1

2020-08-04

### Improvements

-   Added support for hepta device

## v2.2.0

2020-06-18

### Improvements

-   Added support for joining devices into a composite device

### Bugs

## v2.1.1

2020-04-23

### Improvements

### Bugs

-   Device orientation (upsidedown) not affecting threats

## v2.1.0

2020-04-03

### Improvements

-   Added GPS support for devices able to provide GPS location data
-   Updated the API with a new intermediate states
-   Improved the Argos log system
-   device_register service replaced by device_state service with improved
    internal state handling
-   Wolfpack v. 3 support
-   Watchdog v. 3 support

## v2.2.0

??????

### Improvements

-   Now composite devices can be created from Iris
-   It is now possible to set the serial number on devices from the API

### Bugs
