# Release Note for ARGOS API

This document covers API changes to Argos intended for system integrators. For end-user-related
changes including bug fixes to Iris and Argos refer to `Release_note_C2` document.

Contact MyDefence support for older release notes.

## 6.5.0 - 2026-06

### Attention

### New Features
- New transport option `tlsServer` in TAK configuration, with related `TakTlsClient...` API
  for creating and managing client credentials.

### Improvements

- New optional property `rcs` added to UthreatBasisLocation to provide radar cross section
  information from supporting radars.

### Bug Fixes

## 6.4.1

No API changes.

## 6.4.0

### Attention

- New device type `boxer`.
- New device miscellaneous type `ecmChannels` added. In Argos 6 this will only be used with
  the new device type `boxer`.
- **deprecation notice** device miscellaneous type `frequencyBands` used with ECM devices will
  be removed, and all ECM devices will be converted to device miscellaneous type `ecmChannels`.
  Integrators are encouraged to handle both types.
- EcmState/EcmHistory property `activeFrequencyBands` changed from array of `FrequencyBand`
  to array of `string`. The change is backward compatible, because when using existing ECM devices
  the strings can be assumed to be of type `FrequencyBand`. Only when using Boxer device, will
  other values be used.
- Add property `autoConfidenceThreshold` to EcmConfig and mark all properties as required.
  Also added to EcmConfigure, but all properties on this are still optional, so API is backward
  compatible. Defaults to 0.5 if not set.
- Add property `confidenceThreshold` to AlarmZone\*. Optional in AlarmZoneAdd and will
  default to 0.5 if not provided. AlarmZoneUpdate now allows providing only changed properties.
- Clarified that property `activeFrequencyBands` in ecmState and
  ecmUpdated is always present, and properties `deviceDetails` and `timestamp`
  are deprecated.
- UthreatBasis property `classification` widened from string enum to any string.

### Improvements

- doc: Add missing documentation for affiliation handling to interface specification.

## 6.3.2

No API changes.

## 6.3.1

No API changes.

## 6.3.0

### Attention

- `missionCenter` properties `latitude` and `longitude` may no longer be `null`.
- `deviceLocationChanged` and `deviceLocations` properties `deviceLocationX` and
  `deviceLocationY` are now required (always present).
- DeviceMiscellaneousData type `assetData` may be modified from API. For very advanced
  integrations only.
- Uthreat/UthreatBasis property `muted` can now also have values `suppressed` and `type`. This
  will only happen if the client has subscribed for suppressed uthreats.
- UthreatBasis threat property can no longer have value `true`.
- Additional property `affiliation` added to Uthreat and UthreatHistory.
- uthreatHistory elements now includes property `uasId` if it has been decoded by a sensor.
- uthreat history database will be reset.

### Improvements

- Optional classification property added to UthreatBasis to convey information about
  classification for devices supporting classification.

## Version 6.2.0

### Attention

- `deviceMiscellaneous` and `deviceLocations` are now automatically
  pushed immediately after `deviceAdded` when a device is automatically
  discovered and added or manually added. Miscellaneous and location data can
  still be requested with their associated get requests.
- ArgosClient: changed such that only push messages are emitted on
  eventEmitter. Prior to this change, responses to a request was also emitted
  on the associated event
- TakConfiguration property `locationDeviceId` renamed to `vehicleDeviceId`, added new
  properties `sendLocations` and `sendThreatDetails`.
- Added property `origins` to UthreatBasis and UthreatHistory to distinguish between threats
  detected locally, externally, or a fusion of both.

## Version 6.1.0

### Attention

- Added deviceMiscellaneousType `ptzDefaultDistance`, `ptzDefaultHeight`
  and `nominalTargetSize`.

### Improvements

- PTZ follow functionality on direction uthreat if sensor and and PTZ device is in
  the same composite device.
- Handling of uthreatId in sensor fusion improved when joining/splitting
  threats.

## Version 6.0.0

This release features significant security improvements, notably user management
with user capabilities, change to HTTPS only (configurable), and cleanup of open
ports.

User capabilities enables system administrators to limit what different users
are allowed to do, e.g. a user can be disallowed from starting GNSS jamming.

This release is tightly coupled to, and can only be installed using the new
System Manager version `4.0.0`. Please also read its release documentation. All
user management is done in the System Manager.

The update is backward compatible: Existing Argos integrations do not have to
implement the user handling and HTTPS. To be backwards compatible, you will need
to enable HTTP access and enable the `argos` user in the System Manager. Please
refer to the updated ArgosInterfaceSpecification.

Also see ArgosInterfaceSpecification for default users and passwords.

### Attention

- User management: Socket.io connection must be established with an
  authentication cookie (user token) acquired from the System Manager login
  API endpoint. Refer to the updated ArgosInterfaceSpecification and node.js
  interface examples. The authentication can be disabled in the System
  Manager, by enabling the 'argos` user, which will enable login without a
  cookie, and with the capabilities of the 'argos' user.
- Security: Default only HTTPS (port 5051) access is enabled. HTTP (port 5050)
  can be enabled in the System Manager for backwards compatibility.
- The certificate authority certificates used for the self signed HTTPS
  certificates has been updated according to best security practices, and must
  be reinstalled. This is done using the scripts downloadable from the landing
  page on port 80.
- PtzDeviceInfo and PtzDeviceSet `tracking` properties updated. See schemas.

### Improvements

- New command `uthreatGetList` can be used to fetch current uthreats.
- New event `uthreatList` is sent on (re)start of sensor fusion service to
  ensure state is synchronized between client and Argos.
- PTZ Added optional property `trackingBasisThreatId` to PtzDeviceInfo.
  Currently only used with VisionFlex camera to indicate threat being
  followed. Added optional property `subDeviceId` to ptzMoveAbs (position
  variant).
- VMS Added event vmsBoundingBox with information on threat position in
  video stream.
- On login an `userWelcome` message is pushed with user details.
- New command `userLogout` can be used to remove the user's token.
- New event `vmsBoundingBox` contains information about location of tracked
  drones in video streams. Currently only used with VisionFlex camera.

### Bug fixes

- PTZ move commands ignored subDeviceId.

## Version 5.4.0

No API changes.

## Version 5.3.0

### Attention

- Added `CoT` to uthreat and uthreatBasis property `detectionType` for
  Cursor-on-Target originated threats.
- Added deviceType `tak` TAK device, e.g. ATAK (Android Tactical
  Awareness Kit). Also added new createdBy `extern` currently only used with
  TAK devices.
- UthreatBasisLocation may now also contain `rfInfo` property
- Added deviceMiscellaneousType `takInfo`.

### Improvements

- (A)TAK/CoT support. Support sending and receiving drone-related CoT
  messages. Support for broadcast, TCP, and TLS as CoT transports. See new API
  events `takConfig*` and `takTransport*`.

### Bug fixes

- fix missing followUthreatId in ptzFollowStarted message.

## Version 5.2.0

### Attention

- API
    - Optional field `startTime` removed from `systemState`
- Support for OpenWorks Vision Flex camera V1 API removed.

### Improvements

- New `deviceMiscellaneousType` for setting profile of a device:
  `deviceMiscellaneousProfiles`. If a device supports profiles - e.g.
  "longRange" or "shortRange" - then these can be read and the active
  profile set through this miscellaneous object.
- New `streamDetails` in `vmsStreamList` elements, with properties
  describing e.g. resolution, frames per second, etc.
- New `detectionType` "Vision" in `uthreat` schema to be used in uthreats
  from cameras capable of detection/classification.

### Bug fixes

- Jaegar and VisionFlex camera PtzDeviceInfo fixed. Zoom `pct` = 1 is maximum
  zoom (low field-of-view) and `pct` = 0 is minimum zoom (high field-of-view).

## Version 5.1.0

No API changes.

## Version 5.0.1

### Bug fixes

- Interface example fixes. Some package dependencies were not at correct
  version, and description of install procedure was incomplete.

## Version 5.0.0

### Attention

- **BREAKING CHANGE**: DeviceMiscellaneousInfo and
  DeviceMiscellaneousChange has been split into separate schemas, so it is
  clear
    - which properties are always present in Info messages, and
    - which properties cannot be set form the client
        > In particular this affects `deviceMiscellaneousType`
        > "frequencyBands". Properties `frequencyBands` and
        > `numSimultaneusBands` used to be required, but are now disallowed
        > in DeviceMiscellaneousChange.

- Device schema updates
    - `minAngle`, `maxAngleFallback` and `noAngleFallback` removed from
      `deviceAttributes`.
    - `maxAngle` is now set for all leaf devices to represent their coverage
      area.
    - `createdBy` is now mandatory.
    - Deprecation notice removed from `deviceAttributes.deviceHeading`
    - Deprecation notice added to `deviceState` "created". "disconnected" will
      be used in its place.
    - Added optional `deviceCalibration` property.
- deviceLocationChange no longer allows setting `deviceLocationLatitude`
  or `deviceLocationLongitude` on child devices. It never had any effect.
- Auto-generated typescript types are now placed in a file named `argosApi.ts`
  instead of `argos-api.ts`.

### Improvements

- New `deviceType` "lizardEar" in `device` schema.
- New `detectionType` "Audio" in `uthreat` schema to be used in uthreats
  from audio sensors like LizardEar.
- compositeDeviceAdd can be used to group any devices into a generic
  composite when using the new `deviceType` "composite". This includes making
  composites of composites.
- When deleting a composite device, children will be restored in unmounted
  state. The exception is auto-discoverable children, which will be deleted,
  but reappear shortly after if still present (unchanged behavior).
- deviceCalibrationStart can be used to initiate calibration. Currently
  it is possible to calibrate compass of WolfPack and WD150 devices.
- node.js API interface example code rewritten.
