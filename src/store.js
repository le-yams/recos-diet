import Vuex from "vuex";
import refs from "./refs-data";
import {comparingByLabel} from "./utils";

const secondInMillis = 1000;
const minute = 60 * secondInMillis;
const hour = 60 * minute;

export function initStore() {
    return new Vuex.Store({
        state: {
            appVersion: {
                current: process.env.PACKAGE_VERSION || '0',
                checkForUpdateDelay: 20 * minute,
                updateWarningSleep: 2 * hour,
            },
            idealBmi: 24.9,
            patient: {
                height: 170,
                weight: 70,
                bmi: 24.2,
                adjustedWeight: 70,
            },
            nutrition: {
                type: refs.nutritionTypes.ENTERALE,
                product: refs.nutritions[refs.nutritionTypes.ENTERALE].products[3],
            },
            pathologies: [],
            constants: refs,
            bibliography: {
                outlinedIndex: 0,
            },
            survey: {
                enabled: false
            }
        },
        getters: {
            currentVersion: (state) => {
                return state.appVersion.current
            },
        },
        mutations: {
            updatePatientInfo(state, heightAndWeight) {
                let height = heightAndWeight.height;
                let weight = heightAndWeight.weight;
                let hm = height / 100;
                let bmi = (weight / (hm * hm)).toFixed(1)
                let adjustedWeight = weight
                if (bmi > state.idealBmi) {
                    let idealWeight = 2.2 * state.idealBmi + (3.5 * state.idealBmi * ((height / 100) - 1.5));
                    adjustedWeight = (idealWeight + (weight - idealWeight) * 0.33).toFixed(1);
                }

                state.patient = {
                    height: height,
                    weight: weight,
                    bmi: bmi,
                    adjustedWeight: adjustedWeight,
                }

                let pathologies = state.pathologies.filter(p => !p.calculation);
                refs.pathologies.filter(p => p.calculation).forEach(patho => {
                    if (patho.calculation.perform(state.patient)) {
                        pathologies.push(patho)
                    }
                });
                state.pathologies = pathologies
                    .sort(comparingByLabel);
            },
            updateNutrition(state, nutrition) {
                state.nutrition = {...nutrition};
            },
            updateSelectedPathologies(state, pathologies) {
                state.pathologies = state.pathologies.filter(p => p.calculation)
                    .concat(pathologies)
                    .sort(comparingByLabel);
            },
            outlineBiliography(state, index) {
                state.bibliography.outlinedIndex = index;
            }
        }
    });
}
