/**
 * Copyright (c) 2026 MyDefence A/S. All rights reserved.
 *
 * These computer program listings and specifications are the property of
 * MyDefence A/S and shall not be reproduced or copied or used in whole or in
 * part without written permission from MyDefence A/S.
 */
import { mkdir, open } from 'node:fs/promises';
import { API } from '../argosApi.js';
import { CAPABILTY_REQUIREMENTS, CAPABILTY_REQUIREMENTS_NONE } from '../argosApiCapabilities.js';
import { readArgosSchema } from './readSchema.js';
// Filter out outgoing events
const OUT_ENDINGS = ['Completed', 'Error', 'ed', 'Result'];
const OUT_EVENTS = [
    API.DEVICE_LIST,
    API.DEVICE_LOCATIONS,
    API.ECM_STATE,
    API.SYSTEM_STATE,
    API.TIME,
    API.PTZ_DEVICE_INFO,
    API.PTZ_DEVICE_UPDATE,
    API.UTHREAT,
    API.UTHREAT_HISTORY,
    API.UTHREAT_HISTORY_DATA,
    API.SYSTEM_LOG,
    API.RF_RECORD_THREATS_CONFIG,
    API.DEVICE_MISCELLANEOUS,
    API.ECM_HISTORY,
    API.MISSION_CENTER,
    API.USER_WELCOME,
    API.TIMEOUT,
    API.VMS_BOUNDING_BOX,
    API.SITE_TUNER_PARAMETERS,
    API.SITE_TUNER_PROGRESS,
    API.UTHREAT_MUTE_STATUS,
];
async function checkCapabilities(events) {
    let error = false;
    const capMap = new Map();
    for (const event of events) {
        if (OUT_ENDINGS.some((end) => event.endsWith(end)))
            continue;
        if (event.endsWith('List') && !event.endsWith('GetList'))
            continue;
        if (event.endsWith('Configuration') && !event.endsWith('GetConfiguration'))
            continue;
        if (OUT_EVENTS.includes(event))
            continue;
        capMap.set(event, 'missing');
    }
    // Lookup their capability requirement
    CAPABILTY_REQUIREMENTS_NONE.forEach((event) => {
        if (capMap.has(event)) {
            capMap.set(event, 'none');
        }
        else {
            console.error('Unknown event (no capability):', event);
            error = true;
        }
    });
    Object.entries(CAPABILTY_REQUIREMENTS).forEach(([event, cap]) => {
        if (capMap.has(event)) {
            if (Array.isArray(cap)) {
                capMap.set(event, cap);
            }
            else {
                capMap.set(event, [cap]);
            }
        }
        else {
            console.error('Unknown event (with capability):', event);
            error = true;
        }
    });
    capMap.forEach((cap, event) => {
        if (cap === 'missing') {
            console.error('Missing capability for event:', event);
            error = true;
        }
    });
    if (error) {
        process.exit(1);
    }
    return capMap;
}
async function writeLatexTable(capMap) {
    await mkdir('auto', { recursive: true });
    const file = await open('auto/capabilities.tex', 'w');
    for (const [event, cap] of capMap) {
        if (cap === 'none')
            continue;
        if (cap === 'missing')
            continue; // not possible, needed for ts narrowing
        let capTex = cap.map((c) => c.replaceAll('_', '\\_')).join(' / ');
        if (event === API.DEVICE_MISCELLANEOUS_CHANGE || event === API.ECM_CONFIGURE) {
            capTex += ' (*)';
        }
        await file.write(`${event} & ${capTex} \\\\ \\hline\n`);
    }
    // \end{tabular} needs to be in this file, otherwise table is ugly
    await file.write('\\end{tabular}\n');
    await file.close();
}
async function main() {
    const { events } = await readArgosSchema();
    const capMap = await checkCapabilities(events);
    await writeLatexTable(capMap);
}
main();
//# sourceMappingURL=capability_check.js.map