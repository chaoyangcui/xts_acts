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
import commonEvent from '@ohos.commonevent'
import featureAbility from '@ohos.ability.featureAbility'

function PublishCallBackone() {
    console.debug("====>Publish CallBack ACTS_StartAbilityForResult_0100_CommonEvent====>");
}
function PublishCallBacktwo() {
    console.debug("====>Publish CallBack ACTS_StartAbilityForResult_0200_CommonEvent====>");
}
function PublishCallBackthree() {
    console.debug("====>Publish CallBack ACTS_StartAbilityForResult_0300_CommonEvent====>");
}
function PublishCallBackfour() {
    console.debug("====>Publish CallBack ACTS_StartAbilityForResult_0400_CommonEvent====>");
}
function PublishCallBackfive() {
    console.debug("====>Publish CallBack ACTS_StartAbilityForResult_0500_CommonEvent====>");
}
function PublishCallBacksix() {
    console.debug("====>Publish CallBack ACTS_StartAbilityForResult_0600_CommonEvent====>");
}

export default {
    data: {
        title: "StartAbility"
    },
    onInit() {
        this.title = this.data.title;
    },
    async onShow() {
        commonEvent.publish("ACTS_StartAbilityForResult_0100_CommonEvent", PublishCallBackone);
        commonEvent.publish("ACTS_StartAbilityForResult_0200_CommonEvent", PublishCallBacktwo);
        commonEvent.publish("ACTS_StartAbilityForResult_0300_CommonEvent", PublishCallBackthree);
        commonEvent.publish("ACTS_StartAbilityForResult_0400_CommonEvent", PublishCallBackfour);
        commonEvent.publish("ACTS_StartAbilityForResult_0500_CommonEvent", PublishCallBackfive);
        commonEvent.publish("ACTS_StartAbilityForResult_0600_CommonEvent", PublishCallBacksix);
        var promise = await featureAbility.finishWithResult(
            {
                resultCode: 1,
                want:
                {
                    bundleName: "com.example.startabilityforresult",
                    abilityName: "com.example.startabilityforresult.MainAbility",
                },
            }
        );
        await featureAbility.terminateAbility();
    },
    onReady() {
    },
}