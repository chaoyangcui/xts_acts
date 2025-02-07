/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import featureAbility from '@ohos.ability.featureability'
import abilitymanager from '@ohos.app.abilitymanager'
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from 'deccjsunit'

var WeightReasonCode = {
    REASON_UNKNOWN: 0,
    WEIGHT_FOREGROUND: 100,
    WEIGHT_FOREGROUND_SERVICE: 125,
    WEIGHT_VISIBLE: 200,
    WEIGHT_PERCEPTIBLE: 230,
    WEIGHT_SERVICE: 300,
    WEIGHT_TOP_SLEEPING: 325,
    WEIGHT_CANT_SAVE_STATE: 350,
    WEIGHT_CACHED: 400,
    WEIGHT_GONE: 1000
}

var abilityNameList = [
    "com.ohos.launcher.MainAbility",
    "com.example.SimulateFeatureAbilityFir",
    "com.example.VerifyIoThirdAbility",
    "com.example.actsamscallbacksecondscene.MainAbility"
]

var bundleNameList = [
    "com.ohos.launcher",
    "com.ohos.systemui",
    "com.ix.simulate.feature",
    "com.ix.verify.io",
    "com.example.actsamscallbacksecondscene"
]

describe('ActsAmsCallBackSecondScene', function () {
    console.info('----ActsAmsCallBackSecondScene----');
    beforeAll(function () {
        featureAbility.startAbility(
            {
                want:
                {
                    deviceId: "",
                    bundleName: "com.ohos.launcher",
                    abilityName: "com.ohos.launcher.MainAbility",
                    action: "action1",
                    parameters:
                        {},
                },
            },
        );
        var maxnum = 20, flag = 1;
        abilitymanager.queryRecentAbilityMissionInfos(maxnum, flag, data => {
            console.info('queryRecentAbilityMissionInfos data  ' + JSON.stringify(data));
            for (var i = 0; i < data.length; i++) {
                if (data[i].baseAbility.bundleName != 'com.example.actsamscallbacksecondscene' &&
                    data[i].topAbility.bundleName != 'com.example.actsamscallbacksecondscene') {
                    abilitymanager.removeMission(data[i].id,
                        (info) => {
                            console.info(' removeMission data  [' + info + ']');
                        });
                }
            }
        });
        featureAbility.startAbility(
            {
                want:
                {
                    deviceId: "",
                    bundleName: "com.ix.verify.io",
                    abilityName: "com.example.VerifyIoThirdAbility",
                    action: "action1",
                    parameters:
                        {},
                },
            }
        );
        featureAbility.startAbility(
            {
                want:
                {
                    deviceId: "",
                    bundleName: "com.ix.simulate.feature",
                    abilityName: "com.example.SimulateFeatureAbilityFir",
                    action: "action1",
                    parameters:
                        {},
                },
            }
        );
    });

    afterAll(function () {
        featureAbility.startAbility(
            {
                want:
                {
                    deviceId: "",
                    bundleName: "com.ohos.launcher",
                    abilityName: "com.ohos.launcher.MainAbility",
                    action: "action1",
                    entities: ["entity1"],
                    type: "MIMETYPE",
                    uri: "key={true,true,false}",
                    options:
                        {},
                    parameters:
                        {},
                },
            },
        );
        abilitymanager.clearMissions();
    });

    /*
     * @tc.number    : Acts_Ams_test_1800
     * @tc.name      : getAllRunningProcesses : Get All Running Processes Info
     * @tc.desc      : Get All Running Processes Info(by CallBack)
     */
    it('Acts_Ams_test_1800', 0, async function (done) {
        setTimeout(function () {
            abilitymanager.getAllRunningProcesses(
                (error, info) => {
                    console.info('getAllRunningProcesses error.code \
                    ' + error.code + ', data length [' + info.length + ']');
                    console.info('Acts_Ams_test_1800 getAllRunningProcesses data  ' + JSON.stringify(info));
                    expect(Array.isArray(info)).assertEqual(true);
                    expect(info.length).assertEqual(5);
                    for (var i = 0; i < info.length; i++) {
                        expect(typeof (info[i].pid)).assertEqual("number");
                        expect(info[i].pid).assertLarger(0);

                        expect(typeof (info[i].processName)).assertEqual("string");
                        expect(info[i].processName.length).assertLarger(0);
                        expect(bundleNameList.indexOf(info[i].processName)).assertLarger(-1);

                        expect(Array.isArray(info[i].pkgList)).assertEqual(true);
                        expect(info[i].pkgList.length).assertEqual(0);

                        expect(typeof (info[i].uid)).assertEqual("number");
                        expect(info[i].uid).assertLarger(0);

                        expect(typeof (info[i].lastMemoryLevel)).assertEqual("number");
                        expect(info[i].lastMemoryLevel).assertEqual(-1);

                        expect(typeof (info[i].weight)).assertEqual("number");
                        expect(info[i].weight).assertEqual(-1);

                        expect(typeof (info[i].weightReasonCode)).assertEqual("number");
                        expect(info[i].weightReasonCode).assertEqual(WeightReasonCode.REASON_UNKNOWN);
                    }
                });
            done();
        }, 5000);
    })

    /*
     * @tc.number    : Acts_Ams_test_2000
     * @tc.name      : queryRunningAbilityMissionInfos : Query Running Ability Mission Infos
     * @tc.desc      : Query Running Ability Mission Infos(by CallBack)
     */
    it('Acts_Ams_test_2000', 0, async function (done) {
        var maxnum = 20;
        abilitymanager.queryRunningAbilityMissionInfos(maxnum,
            (error, info) => {
                console.info('queryRecentAbilityMissionInfos error.code : \
                ' + error.code + ',data length [' + data.length + ']');
                console.info('Acts_Ams_test_2000 queryRunningAbilityMissionInfos info  ' + JSON.stringify(info));
                expect(Array.isArray(info)).assertEqual(true);
                expect(info.length).assertEqual(3);
                for (var i = 0; i < info.length; i++) {
                    expect(typeof (info[i].id)).assertEqual("number");
                    expect(info[i].id).assertLarger(0);

                    expect(typeof (info[i].baseAbility)).assertEqual("object");
                    expect(typeof (info[i].baseAbility.deviceId)).assertEqual("string");
                    expect(info[i].baseAbility.deviceId.length).assertEqual(0);
                    expect(typeof (info[i].baseAbility.bundleName)).assertEqual("string");
                    expect(info[i].baseAbility.bundleName.length).assertLarger(0);
                    expect(bundleNameList.indexOf(info[i].baseAbility.bundleName)).assertLarger(-1);
                    expect(typeof (info[i].baseAbility.abilityName)).assertEqual("string");
                    expect(info[i].baseAbility.abilityName.length).assertLarger(0);
                    expect(abilityNameList.indexOf(info[i].baseAbility.abilityName)).assertLarger(-1);

                    expect(typeof (info[i].topAbility)).assertEqual("object");
                    expect(typeof (info[i].topAbility.deviceId)).assertEqual("string");
                    expect(info[i].topAbility.deviceId.length).assertEqual(0);
                    expect(typeof (info[i].topAbility.bundleName)).assertEqual("string");
                    expect(info[i].topAbility.bundleName.length).assertLarger(0);
                    expect(bundleNameList.indexOf(info[i].topAbility.bundleName)).assertLarger(-1);
                    expect(typeof (info[i].topAbility.abilityName)).assertEqual("string");
                    expect(info[i].topAbility.abilityName.length).assertLarger(0);
                    expect(abilityNameList.indexOf(info[i].topAbility.abilityName)).assertLarger(-1);

                    expect(typeof (info[i].missionDescription)).assertEqual("object");
                    expect(typeof (info[i].missionDescription.label)).assertEqual("string");
                    expect(typeof (info[i].missionDescription.iconPath)).assertEqual("string");
                }
            });
        done();
    })

    /*
     * @tc.number    : Acts_Ams_test_2200
     * @tc.name      : queryRecentAbilityMissionInfos : Query Recent Ability Mission Infos
     * @tc.desc      : Query Recent Ability Mission Infos(by CallBack)
     */
    it('Acts_Ams_test_2200', 0, async function (done) {
        var maxnum = 20, flag = 1;
        abilitymanager.queryRecentAbilityMissionInfos(maxnum, flag,
            (error, info) => {
                console.info('queryRunningAbilityMissionInfos error.code : \
                ' + error.code + ',data length [' + data.length + ']');
                console.info('Acts_Ams_test_2200 queryRecentAbilityMissionInfos info  ' + JSON.stringify(info));
                expect(Array.isArray(info)).assertEqual(true);
                expect(info.length).assertEqual(3);
                for (var i = 0; i < info.length; i++) {
                    expect(typeof (info[i].id)).assertEqual("number");
                    expect(info[i].id).assertLarger(0);

                    expect(typeof (info[i].baseAbility)).assertEqual("object");
                    expect(typeof (info[i].baseAbility.deviceId)).assertEqual("string");
                    expect(info[i].baseAbility.deviceId.length).assertEqual(0);
                    expect(typeof (info[i].baseAbility.bundleName)).assertEqual("string");
                    expect(info[i].baseAbility.bundleName.length).assertLarger(0);
                    expect(bundleNameList.indexOf(info[i].baseAbility.bundleName)).assertLarger(-1);
                    expect(typeof (info[i].baseAbility.abilityName)).assertEqual("string");
                    expect(info[i].baseAbility.abilityName.length).assertLarger(0);
                    expect(abilityNameList.indexOf(info[i].baseAbility.abilityName)).assertLarger(-1);

                    expect(typeof (info[i].topAbility)).assertEqual("object");
                    expect(typeof (info[i].topAbility.deviceId)).assertEqual("string");
                    expect(info[i].topAbility.deviceId.length).assertEqual(0);
                    expect(typeof (info[i].topAbility.bundleName)).assertEqual("string");
                    expect(info[i].topAbility.bundleName.length).assertLarger(0);
                    expect(bundleNameList.indexOf(info[i].topAbility.bundleName)).assertLarger(-1);
                    expect(typeof (info[i].topAbility.abilityName)).assertEqual("string");
                    expect(info[i].topAbility.abilityName.length).assertLarger(0);
                    expect(abilityNameList.indexOf(info[i].topAbility.abilityName)).assertLarger(-1);

                    expect(typeof (info[i].missionDescription)).assertEqual("object");
                    expect(typeof (info[i].missionDescription.label)).assertEqual("string");
                    expect(typeof (info[i].missionDescription.iconPath)).assertEqual("string");
                }
            });
        done();
    })

    /*
     * @tc.number    : Acts_Ams_test_2400
     * @tc.name      : removeMission : Remove Mission
     * @tc.desc      : Remove Mission(by CallBack)
     */
    it('Acts_Ams_test_2400', 0, async function (done) {
        var maxnum = 20;
        var result = await abilitymanager.queryRunningAbilityMissionInfos(maxnum);
        abilitymanager.removeMission(result[1].id,
            (error, info) => {
                console.info('Acts_Ams_test_2400 removeMission error.code \
                ' + error.code + ',data  [' + info + ']');
                expect(info).assertEqual(0);
            });
        done();
    })

    /*
     * @tc.number    : Acts_Ams_test_2800
     * @tc.name      : moveMissionToTop : Move Mission To Top
     * @tc.desc      : Move Mission To Top(by CallBack)
     */
    it('Acts_Ams_test_2800', 0, async function (done) {
        var maxnum = 20;
        var result = await abilitymanager.queryRunningAbilityMissionInfos(maxnum);
        abilitymanager.moveMissionToTop(result[0].id,
            (error, info) => {
                console.info('Acts_Ams_test_2800 moveMissionToTop error.code \
                ' + error.code + ',data  [' + info + ']');
                expect(info).assertEqual(0);
            });
        done();
    })

    /*
     * @tc.number    : Acts_Ams_test_3000
     * @tc.name      : removeMissions: Remove Missions
     * @tc.desc      : Remove Missions(by CallBack)
     */
    it('Acts_Ams_test_3000', 0, async function (done) {
        var maxnum = 20;
        var result = await abilitymanager.queryRunningAbilityMissionInfos(maxnum);
        abilitymanager.removeMissions([result[0].id],
            (error, info) => {
                console.info('Acts_Ams_test_3000 removeMissions error.code \
                ' + error.code + ',data  [' + info + ']');
                expect(info).assertLarger(0);
            });
        done();
    })

    /*
     * @tc.number    : Acts_Ams_test_2600
     * @tc.name      : clearMissions: Clear Missions
     * @tc.desc      : Clear Missions(by CallBack)
     */
    it('Acts_Ams_test_2600', 0, async function (done) {
        abilitymanager.clearMissions(
            (error, info) => {
                console.info('Acts_Ams_test_2600 clearMissions error.code \
                ' + error.code + ',data  [' + info + ']');
                expect(info).assertLarger(0);
            });
        done();
    })

    /*
     * @tc.number    : Acts_Ams_test_3200
     * @tc.name      : killProcessesByBundleName : Kill Processes By BundleName
     * @tc.desc      : Kill Processes By BundleName(by CallBack)
     */
    it('Acts_Ams_test_3200', 0, async function (done) {
        abilitymanager.killProcessesByBundleName('XXXXXXXXXXXX',
            (error, info) => {
                console.info('Acts_Ams_test_3200 killProcessesByBundleName error.code: \
                ' + error.code + ',data  [' + info + ']');
                expect(info).assertEqual(0);
            });
        done();

    })
})


