/**
 * Copyright (c) 2026 MyDefence A/S. All rights reserved.
 *
 * These computer program listings and specifications are the property of
 * MyDefence A/S and shall not be reproduced or copied or used in whole or in
 * part without written permission from MyDefence A/S.
 */
import { ArgosTypesMap, UserCapability } from './argosApi.js';
/** This lists all incoming events with requirement for user capabilities. Notice, that GNSS related
 * requests also need `CAP_C2_GNSS` capability (see ArgosInterfaceSpecification.pdf for more info).
 * If multiple capabilities are listed, then *either* one of them is sufficient.
 * */
export declare const CAPABILTY_REQUIREMENTS: Partial<Record<keyof ArgosTypesMap, UserCapability | readonly UserCapability[]>>;
/** This lists all incoming events with ***no*** requirement for user capabilities. */
export declare const CAPABILTY_REQUIREMENTS_NONE: ReadonlyArray<keyof ArgosTypesMap>;
