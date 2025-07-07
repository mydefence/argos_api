/*******************************************************************************
 *
 * Copyright (C) 2020 MyDefence Communication A/S. All rights reserved.
 *
 * These computer program listings and specifications, are the property of
 * MyDefence Communication A/S and shall not be reproduced or copied or used in
 * whole or in part without written permission from MyDefence Communication A/S.
 *
 *******************************************************************************/
import { ArgosTypesMap, UserCapability } from './argosApi';
/** This lists all incoming events with requirement for user capabilities. Notice, that GNSS related
 * requests also need `CAP_C2_GNSS` capability (see ArgosInterfaceSpecification.pdf for more info).
 * */
export declare const CAPABILTY_REQUIREMENTS: Partial<Record<keyof ArgosTypesMap, UserCapability | UserCapability[]>>;
/** This lists all incoming events with ***no*** requirement for user capabilities. */
export declare const CAPABILTY_REQUIREMENTS_NONE: Array<keyof ArgosTypesMap>;
