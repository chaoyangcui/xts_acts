/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
#ifndef PLAYER_API_TEST_H
#define PLAYER_API_TEST_H

#include "Testplayer.h"

namespace OHOS {
namespace Media {
class ActsPlayerAPITest : public testing::Test {
public:
    // SetUpTestCase: before all testcasee
    static void SetUpTestCase(void)
    {
        MEDIA_INFO_LOG("ActsPlayerAPITest::SetUpTestCase");
    };
    // TearDownTestCase: after all testcase
    static void TearDownTestCase(void)
    {
        MEDIA_INFO_LOG("ActsPlayerAPITest::TearDownTestCase");
    };
    // SetUp
    void SetUp(void)
    {
        MEDIA_INFO_LOG("ActsPlayerAPITest::SetUp");
    };
    // TearDown
    void TearDown(void)
    {
        MEDIA_INFO_LOG("ActsPlayerAPITest::TearDown");
    };
    void LocalPlayFunc(const std::string uri, bool isAsync, WindowConfig config = g_config);
};
}
}
#endif
