/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { interfaces } from 'inversify';
import { createPreferenceProxy, PreferenceProxy, PreferenceService, PreferenceContribution, PreferenceSchema } from '@theia/preferences-api/lib/common';

export const enum PLANTUML {
    WEBSERVICE = 'plantuml.webservice',
    MONOCHROME = 'plantuml.monochrome',
}

export const PlantumlConfigSchema: PreferenceSchema = {
    'type': 'object',
    'properties': {
        [PLANTUML.WEBSERVICE]: {
            'type': 'string',
            'description': 'The URL of the PlantUML rendering service.'
        },
        [PLANTUML.MONOCHROME]: {
            'type': 'boolean',
            'description': 'Use monochrome skincolor if no skinparams are specified.'
        },
    }
};

export interface PlantumlConfiguration {
    'plantuml.webservice': string;
    'plantuml.monochrome': boolean;
}

export const defaultPlantumlConfiguration: PlantumlConfiguration = {
    [PLANTUML.WEBSERVICE]: 'http://www.plantuml.com/plantuml/svg/',
    [PLANTUML.MONOCHROME]: true,
};

export const PlantumlPreferences = Symbol('PlantumlPreferences');
export type PlantumlPreferences = PreferenceProxy<PlantumlConfiguration>;

export function createPlantumlPreferences(preferences: PreferenceService): PlantumlPreferences {
    return createPreferenceProxy(preferences, defaultPlantumlConfiguration, PlantumlConfigSchema);
}

export function bindPlantumlPreferences(bind: interfaces.Bind): void {
    bind(PlantumlPreferences).toDynamicValue(ctx => {
        const preferences = ctx.container.get(PreferenceService);
        return createPlantumlPreferences(preferences);
    });

    bind(PreferenceContribution).toConstantValue({ schema: PlantumlConfigSchema });
}
