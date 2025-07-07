"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CAPABILTY_REQUIREMENTS_NONE = exports.CAPABILTY_REQUIREMENTS = void 0;
/*******************************************************************************
 *
 * Copyright (C) 2020 MyDefence Communication A/S. All rights reserved.
 *
 * These computer program listings and specifications, are the property of
 * MyDefence Communication A/S and shall not be reproduced or copied or used in
 * whole or in part without written permission from MyDefence Communication A/S.
 *
 *******************************************************************************/
const argosApi_1 = require("./argosApi");
/** This lists all incoming events with requirement for user capabilities. Notice, that GNSS related
 * requests also need `CAP_C2_GNSS` capability (see ArgosInterfaceSpecification.pdf for more info).
 * */
exports.CAPABILTY_REQUIREMENTS = {
    [argosApi_1.API.ALARM_ZONE_ADD]: 'CAP_C2_CONFIG',
    [argosApi_1.API.ALARM_ZONE_REMOVE]: 'CAP_C2_CONFIG',
    [argosApi_1.API.ALARM_ZONE_UPDATE]: 'CAP_C2_CONFIG',
    [argosApi_1.API.COMPOSITE_DEVICE_ADD]: 'CAP_C2_CONFIG',
    [argosApi_1.API.DEVICE_ADD]: 'CAP_C2_CONFIG',
    [argosApi_1.API.DEVICE_LOCATION_CHANGE]: 'CAP_C2_CONFIG',
    [argosApi_1.API.DEVICE_MISCELLANEOUS_CHANGE]: 'CAP_C2_CONFIG',
    [argosApi_1.API.DEVICE_MOUNT]: 'CAP_C2_CONFIG',
    [argosApi_1.API.DEVICE_REMOVE]: 'CAP_C2_CONFIG',
    [argosApi_1.API.DEVICE_UNMOUNT]: 'CAP_C2_CONFIG',
    [argosApi_1.API.FWU_IMAGE_ADD]: 'CAP_C2_CONFIG',
    [argosApi_1.API.FWU_IMAGE_REMOVE]: 'CAP_C2_CONFIG',
    [argosApi_1.API.FWU_START]: 'CAP_C2_CONFIG',
    [argosApi_1.API.ORIGIN_FILTER_ADD]: 'CAP_C2_CONFIG',
    [argosApi_1.API.ORIGIN_FILTER_REMOVE]: 'CAP_C2_CONFIG',
    [argosApi_1.API.ORIGIN_FILTER_UPDATE]: 'CAP_C2_CONFIG',
    [argosApi_1.API.MISSION_CENTER_SET]: 'CAP_C2_CONFIG',
    [argosApi_1.API.RF_GEO_THREAT_SIMULATION_START]: 'CAP_C2_CONFIG',
    [argosApi_1.API.RF_RECORD_THREATS_CONFIGURE]: 'CAP_C2_CONFIG',
    [argosApi_1.API.SAPIENT_CONFIGURE]: 'CAP_C2_CONFIG',
    [argosApi_1.API.TAK_CONFIGURE]: 'CAP_C2_CONFIG',
    [argosApi_1.API.UTHREAT_CONFIGURE]: 'CAP_C2_CONFIG',
    [argosApi_1.API.ECM_CONFIGURE]: 'CAP_C2_ECM',
    [argosApi_1.API.ECM_START]: 'CAP_C2_ECM',
    [argosApi_1.API.ECM_STOP]: ['CAP_C2_ECM', 'CAP_C2_ECM_STOP'],
    [argosApi_1.API.THREAT_TYPE_MUTE]: 'CAP_C2_MUTE',
    [argosApi_1.API.THREAT_TYPE_UN_MUTE]: 'CAP_C2_MUTE',
    [argosApi_1.API.UTHREAT_SET_MUTE]: 'CAP_C2_MUTE',
};
/** This lists all incoming events with ***no*** requirement for user capabilities. */
exports.CAPABILTY_REQUIREMENTS_NONE = [
    argosApi_1.API.ALARM_ZONE_GET_LIST,
    argosApi_1.API.DEVICE_CALIBRATION_START,
    argosApi_1.API.DEVICE_GET_LIST,
    argosApi_1.API.DEVICE_GET_LOCATIONS,
    argosApi_1.API.DEVICE_GET_MISCELLANEOUS,
    argosApi_1.API.ECM_GET_CONFIGURATION,
    argosApi_1.API.ECM_GET_HISTORY,
    argosApi_1.API.ECM_GET_STATE,
    argosApi_1.API.FEATURE_GET_LIST,
    argosApi_1.API.FWU_IMAGE_GET_LIST,
    argosApi_1.API.FWU_UPDATEABLE_GET_LIST,
    argosApi_1.API.GET_SYSTEM_STATE,
    argosApi_1.API.GET_TIME,
    argosApi_1.API.MISSION_CENTER_GET,
    argosApi_1.API.ORIGIN_FILTER_GET_LIST,
    argosApi_1.API.PTZ_DEVICE_SET,
    argosApi_1.API.PTZ_FOLLOW_GET_LIST,
    argosApi_1.API.PTZ_FOLLOW_START,
    argosApi_1.API.PTZ_FOLLOW_STOP,
    argosApi_1.API.PTZ_MOVE_ABS,
    argosApi_1.API.PTZ_SET_VELOCITY,
    argosApi_1.API.RF_RECORD_GET_LIST,
    argosApi_1.API.RF_RECORD_SNAPSHOT_START,
    argosApi_1.API.RF_RECORD_THREATS_GET_CONFIG,
    argosApi_1.API.SAPIENT_GET_CONFIGURATION,
    argosApi_1.API.SAPIENT_NODE_GET_LIST,
    argosApi_1.API.SYSTEM_LOG_GET_LIST,
    argosApi_1.API.TAK_GET_CONFIGURATION,
    argosApi_1.API.TAK_TRANSPORT_GET_LIST,
    argosApi_1.API.THREAT_TYPE_GET_LIST,
    argosApi_1.API.USER_LOGOUT,
    argosApi_1.API.UTHREAT_GET_CONFIGURATION,
    argosApi_1.API.UTHREAT_GET_HISTORY_DATA,
    argosApi_1.API.UTHREAT_GET_HISTORY,
    argosApi_1.API.UTHREAT_GET_LIST,
    argosApi_1.API.VMS_SDP_INIT,
    argosApi_1.API.VMS_STREAM_GET_LIST,
];
//# sourceMappingURL=argosApiCapabilities.js.map