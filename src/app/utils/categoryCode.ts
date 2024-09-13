export const categoryCode = [
  {
    id: 1,
    kor: "계정 관리",
    eng: "AccountManagement",
  },
  {
    id: 2,
    kor: "게임 플레이",
    eng: "Gameplay",
  },
  {
    id: 3,
    kor: "기술 지원",
    eng: "TechnicalSupport",
  },
  {
    id: 4,
    kor: "결제 및 아이템",
    eng: "PaymentAndItems",
  },
  {
    id: 5,
    kor: "커뮤니티 및 소셜",
    eng: "CommunityAndSocial",
  },
  {
    id: 6,
    kor: "업데이트 및 패치",
    eng: "UpdatesAndPatches",
  },
  {
    id: 7,
    kor: "보안",
    eng: "Security",
  },
  {
    id: 8,
    kor: "게임 규칙 및 정책",
    eng: "GameRulesAndPolicies",
  },
];

export const getCategoryName = (CodeId: number) => {
  const categoryName = categoryCode.find((i) => i.id === CodeId);
  if (categoryName) {
    return { eng: categoryName.eng, kor: categoryName.kor };
  }
};
