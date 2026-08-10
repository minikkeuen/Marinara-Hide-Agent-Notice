# Hide Agent Notices

채팅을 보낼 때 표시되는 아래 유형의 안내만 자동으로 닫습니다.

- 에이전트가 기본 에이전트 연결을 사용 중이라는 안내
- 해당 연결이 유료 API 모델이면 비용이 청구될 수 있다는 안내
- `Image Prompt Writer failed`로 시작하고 **Retry Failed Agents** 사용을 권하는 실패 안내
- 에이전트의 기본 모델 호출이 실패하여 설정된 대체 연결 및 모델로 재시도했다는 안내

그 밖의 에이전트 실행 실패, 연결 불가, 로컬 모델 사용 불가 경고는 숨기지 않습니다. 실패 기록 자체도 삭제하지 않으므로 Agents 메뉴에서 상태를 확인하거나 재시도할 수 있습니다.

v1.1.1부터는 React가 관리하는 토스트 요소를 삭제하지 않고 화면에서만 숨깁니다. 따라서 안내가 닫힐 때 Marinara UI 오류가 발생하지 않습니다.

## 설치

1. Marinara Engine의 **Settings → Addons → Personal Extensions**를 엽니다.
2. 외부 확장 프로그램 사용을 허용합니다.
3. `hide-default-agent-notice.personal-extension.zip` 파일을 가져옵니다.
4. **Full page access** 권한을 검토하고 승인한 뒤 확장 프로그램을 켭니다.

확장 프로그램은 안내 토스트를 구분하기 위해 페이지 화면에 접근합니다. 네트워크 요청을 보내거나 채팅 및 설정 데이터를 변경하지 않습니다.
