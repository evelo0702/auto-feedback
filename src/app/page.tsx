import FaqListCard from "@/components/faq-list-card";
import NoticeList from "@/components/notice-list";
import { Faqs } from "@/types/faqs";
import Link from "next/link";

export default function Home() {
  const dummy = [
    {
      id: 1,
      category: "계정 관리",
      content: {
        question: "계정 생성 방법이 궁금해요.",
        answer:
          "계정을 생성하려면 홈페이지 상단의 '가입하기' 버튼을 클릭하고, 필요한 정보를 입력하여 회원가입을 완료하세요.",
      },
    },
    {
      id: 2,
      category: "계정 관리",
      content: {
        question: "로그인 문제 해결 방법이 무엇인가요?",
        answer:
          "로그인 문제는 일반적으로 비밀번호 오류 또는 계정 잠금 때문일 수 있습니다. 비밀번호를 재설정하거나 계정 잠금 해제 요청을 통해 문제를 해결할 수 있습니다.",
      },
    },
    {
      id: 3,
      category: "계정 관리",
      content: {
        question: "비밀번호를 잊어버렸어요. 어떻게 재설정하나요?",
        answer:
          "비밀번호를 잊으셨다면, 로그인 페이지에서 '비밀번호 재설정' 옵션을 클릭하고, 이메일을 통해 재설정 링크를 받아 비밀번호를 새로 설정하세요.",
      },
    },
    {
      id: 4,
      category: "계정 관리",
      content: {
        question: "계정을 복구하고 싶어요.",
        answer:
          "계정 복구가 필요하다면, 고객 지원팀에 문의하거나 '계정 복구' 페이지를 통해 본인 확인 절차를 진행하세요.",
      },
    },
    {
      id: 5,
      category: "계정 관리",
      content: {
        question: "계정을 삭제하려면 어떻게 해야 하나요?",
        answer:
          "계정을 삭제하려면, '계정 설정'에서 '계정 삭제' 옵션을 선택한 후, 필요한 확인 절차를 완료하세요.",
      },
    },
    {
      id: 6,
      category: "게임 플레이",
      content: {
        question: "게임 내 튜토리얼을 어떻게 이용하나요?",
        answer:
          "게임 내 튜토리얼은 첫 번째 게임 세션에서 자동으로 시작됩니다. 튜토리얼을 건너뛰었거나 다시 보고 싶다면, 게임 메뉴에서 '튜토리얼 다시 보기' 옵션을 선택하세요.",
      },
    },
    {
      id: 7,
      category: "게임 플레이",
      content: {
        question: "게임 시작 방법이 궁금해요.",
        answer:
          "게임을 시작하려면, 게임 클라이언트를 실행하고 로그인한 후, '게임 시작' 버튼을 클릭하세요.",
      },
    },
    {
      id: 8,
      category: "게임 플레이",
      content: {
        question: "레벨업을 어떻게 하나요?",
        answer:
          "레벨업은 게임 내 다양한 퀘스트와 활동을 통해 경험치를 얻고 레벨을 상승시키는 방식으로 이루어집니다.",
      },
    },
    {
      id: 9,
      category: "게임 플레이",
      content: {
        question: "게임 내 이벤트는 어떻게 참여하나요?",
        answer:
          "게임 내 이벤트는 이벤트 페이지에서 참여할 수 있으며, 관련 공지사항과 이벤트 일정은 게임 내 공지 또는 홈페이지에서 확인하세요.",
      },
    },
    {
      id: 10,
      category: "게임 플레이",
      content: {
        question: "캐릭터를 어떻게 선택하고 설정하나요?",
        answer:
          "게임 시작 시 캐릭터 선택 화면에서 원하는 캐릭터를 선택하고, 설정 옵션에서 캐릭터의 외형과 능력을 조정할 수 있습니다.",
      },
    },
    {
      id: 11,
      category: "기술 지원",
      content: {
        question: "버그나 오류를 보고하고 싶어요.",
        answer:
          "버그나 오류를 발견하셨다면, 게임 내 '버그 보고' 기능을 사용하거나 고객 지원팀에 이메일로 문제를 보고해 주세요.",
      },
    },
    {
      id: 12,
      category: "기술 지원",
      content: {
        question: "게임 클라이언트 문제를 해결하려면 어떻게 하나요?",
        answer:
          "게임 클라이언트 문제는 일반적으로 클라이언트 재설치나 업데이트를 통해 해결할 수 있습니다. 문제가 지속될 경우 고객 지원팀에 문의하세요.",
      },
    },
    {
      id: 13,
      category: "기술 지원",
      content: {
        question: "서버 문제로 게임을 이용할 수 없어요.",
        answer:
          "서버 문제가 발생했을 때는 서버 상태 페이지를 확인하거나, 고객 지원팀에 문제를 보고해 주세요.",
      },
    },
    {
      id: 14,
      category: "기술 지원",
      content: {
        question: "그래픽 문제가 발생했어요, 어떻게 해결하나요?",
        answer:
          "그래픽 문제는 그래픽 드라이버 업데이트나 게임 설정 조정을 통해 해결할 수 있습니다. 문제가 지속될 경우 고객 지원팀에 문의하세요.",
      },
    },
    {
      id: 15,
      category: "기술 지원",
      content: {
        question: "게임 성능이 느려요, 어떻게 해결하나요?",
        answer:
          "게임 성능 문제는 시스템 사양 확인, 그래픽 설정 조정, 클라이언트 재설치 등을 통해 개선할 수 있습니다.",
      },
    },
    {
      id: 16,
      category: "결제 및 아이템",
      content: {
        question: "아이템을 어떻게 구매하나요?",
        answer:
          "게임 내 상점에서 원하는 아이템을 선택하고, 결제 방법을 선택하여 구매를 완료하세요.",
      },
    },
    {
      id: 17,
      category: "결제 및 아이템",
      content: {
        question: "환불 정책이 궁금해요.",
        answer:
          "환불 정책은 게임 내 '환불 정책' 페이지에서 확인할 수 있으며, 일반적으로 구매 후 일정 기간 내에 환불 요청이 가능합니다.",
      },
    },
    {
      id: 18,
      category: "결제 및 아이템",
      content: {
        question: "구매한 아이템이 사라졌어요, 어떻게 복구하나요?",
        answer:
          "구매한 아이템이 사라졌다면 고객 지원팀에 문의하여 문제를 신고하고, 아이템 복구 요청을 해 주세요.",
      },
    },
    {
      id: 19,
      category: "결제 및 아이템",
      content: {
        question: "결제 오류가 발생했어요, 어떻게 해결하나요?",
        answer:
          "결제 오류는 결제 방법을 확인하거나, 결제 기록을 검토한 후, 문제가 지속될 경우 고객 지원팀에 문의해 주세요.",
      },
    },
    {
      id: 20,
      category: "결제 및 아이템",
      content: {
        question: "인게임 아이템을 어떻게 사용하나요?",
        answer:
          "인게임 아이템은 게임 내 인벤토리에서 선택하여 사용하거나, 특정 게임 내 메뉴에서 활성화할 수 있습니다.",
      },
    },
    {
      id: 21,
      category: "커뮤니티 및 소셜",
      content: {
        question: "게임 내 채팅 기능은 어떻게 사용하나요?",
        answer:
          "게임 내 채팅 기능은 게임 메뉴에서 '채팅' 옵션을 선택하여 다른 플레이어와 실시간으로 소통할 수 있습니다.",
      },
    },
    {
      id: 22,
      category: "커뮤니티 및 소셜",
      content: {
        question: "리그나 팀을 어떻게 만들 수 있나요?",
        answer:
          "리그나 팀을 만들려면, 게임 내 '리그' 또는 '팀' 메뉴를 선택하고, 관련 설정을 완료한 후, 팀원을 모집하여 리그나 팀을 구성하세요.",
      },
    },
    {
      id: 23,
      category: "커뮤니티 및 소셜",
      content: {
        question: "친구를 추가하고 관리하려면 어떻게 하나요?",
        answer:
          "게임 내 '친구 목록'에서 '친구 추가' 버튼을 클릭한 후, 친구의 게임 ID를 입력하여 친구를 추가하고, 관리할 수 있습니다.",
      },
    },
    {
      id: 24,
      category: "커뮤니티 및 소셜",
      content: {
        question: "게임 내 리포트 시스템은 어떻게 사용하나요?",
        answer:
          "게임 내 리포트 시스템은 문제가 발생한 플레이어나 상황을 신고하는 기능으로, 게임 내 메뉴에서 '리포트' 옵션을 선택하여 신고할 수 있습니다.",
      },
    },
    {
      id: 25,
      category: "커뮤니티 및 소셜",
      content: {
        question: "커뮤니티 규칙은 무엇인가요?",
        answer:
          "커뮤니티 규칙은 게임 내 '커뮤니티 규칙' 페이지에서 확인할 수 있으며, 모든 플레이어는 이를 준수해야 합니다.",
      },
    },
    {
      id: 26,
      category: "업데이트 및 패치",
      content: {
        question: "업데이트 내용은 어떻게 확인하나요?",
        answer:
          "업데이트 내용은 게임 내 '업데이트 노트' 페이지에서 확인하거나, 공식 홈페이지 및 소셜 미디어 채널에서 확인할 수 있습니다.",
      },
    },
    {
      id: 27,
      category: "업데이트 및 패치",
      content: {
        question: "패치 노트는 어디서 확인하나요?",
        answer:
          "패치 노트는 게임 내 '패치 노트' 페이지에서 확인하거나, 공식 홈페이지 및 소셜 미디어 채널에서 확인할 수 있습니다.",
      },
    },
    {
      id: 28,
      category: "업데이트 및 패치",
      content: {
        question: "새로운 콘텐츠는 어떻게 확인하나요?",
        answer:
          "새로운 콘텐츠는 업데이트 노트나 공식 홈페이지에서 확인할 수 있으며, 게임 내에서도 관련 공지사항을 통해 확인할 수 있습니다.",
      },
    },
    {
      id: 29,
      category: "업데이트 및 패치",
      content: {
        question: "업데이트 일정은 어떻게 확인하나요?",
        answer:
          "업데이트 일정은 공식 홈페이지 및 소셜 미디어 채널에서 공지사항을 통해 확인할 수 있습니다.",
      },
    },
    {
      id: 30,
      category: "업데이트 및 패치",
      content: {
        question: "패치 관련 문제를 어떻게 해결하나요?",
        answer:
          "패치 관련 문제는 고객 지원팀에 문의하거나, 공식 포럼에서 유사한 문제를 찾아 해결 방법을 확인할 수 있습니다.",
      },
    },
    {
      id: 31,
      category: "보안",
      content: {
        question: "계정 보안은 어떻게 유지하나요?",
        answer:
          "계정 보안을 유지하려면 강력한 비밀번호를 사용하고, 주기적으로 비밀번호를 변경하며, 2단계 인증을 활성화하세요.",
      },
    },
    {
      id: 32,
      category: "보안",
      content: {
        question: "피싱 및 사기를 방지하려면 어떻게 해야 하나요?",
        answer:
          "피싱 및 사기를 방지하려면, 의심스러운 링크나 이메일을 클릭하지 말고, 계정 정보는 안전한 사이트에서만 입력하세요.",
      },
    },
    {
      id: 33,
      category: "보안",
      content: {
        question: "해킹 대응은 어떻게 하나요?",
        answer:
          "해킹 피해를 방지하려면, 즉시 계정 비밀번호를 변경하고, 고객 지원팀에 연락하여 추가 보안 조치를 취하세요.",
      },
    },
    {
      id: 34,
      category: "보안",
      content: {
        question: "개인정보 보호를 위해 무엇을 해야 하나요?",
        answer:
          "개인정보 보호를 위해, 개인정보를 최소한으로 제공하고, 개인 정보가 저장되는 사이트의 보안성을 확인하세요.",
      },
    },
    {
      id: 35,
      category: "게임 규칙 및 정책",
      content: {
        question: "게임 규칙은 어디서 확인하나요?",
        answer:
          "게임 규칙은 공식 홈페이지의 '게임 규칙' 페이지에서 확인할 수 있습니다.",
      },
    },
    {
      id: 36,
      category: "게임 규칙 및 정책",
      content: {
        question: "스포츠맨십 정책은 무엇인가요?",
        answer:
          "스포츠맨십 정책은 공정한 게임 플레이와 상대방에 대한 존중을 강조하며, 공식 홈페이지에서 자세히 확인할 수 있습니다.",
      },
    },
    {
      id: 37,
      category: "게임 규칙 및 정책",
      content: {
        question: "제재 및 처벌은 어떻게 이루어지나요?",
        answer:
          "제재 및 처벌은 게임 내 규칙 위반에 따라 경고, 일시 정지 또는 영구 정지 등의 형태로 이루어질 수 있습니다.",
      },
    },
    {
      id: 38,
      category: "게임 규칙 및 정책",
      content: {
        question: "규칙 위반 신고는 어떻게 하나요?",
        answer:
          "규칙 위반을 신고하려면, 게임 내 '리포트' 기능을 사용하여 위반 사항을 신고하거나, 고객 지원팀에 문제를 보고하세요.",
      },
    },
  ];
  // FaQ 데이터중에 각 카테고리별로 한개씩만 필터링해주는 메소드
  const ShowHomeFaQData = (dummy: Faqs[]) => {
    const filterFaQData = new Set();
    return dummy.filter((item) => {
      if (!filterFaQData.has(item.category)) {
        filterFaQData.add(item.category);
        return true;
      }
      return false;
    });
  };
  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex flex-1">
          <div className="w-1/2 flex flex-col">
            <div className="flex justify-center text-xl font-normal my-3">
              <p>궁금한게 있으시다면 FAQ를 먼저 확인해주세요!</p>
            </div>
            {ShowHomeFaQData(dummy).map((item) => (
              <FaqListCard key={item.id} {...item} />
            ))}
          </div>
          <div className="w-1/2 bg-sky-400 ">
            <NoticeList />
          </div>
        </div>

        <div className="flex h-1/2 justify-center items-center text-xl">
          <div className="flex justify-center items-center">
            FAQ와 공지사항으로 궁금한점이 해결이 안되셨다면
            <Link href={"/contact"} className="mx-2 text-5xl ">
              Contact
            </Link>
            를 통해 문의해주세요
          </div>
        </div>
      </div>
    </>
  );
}
