// 프로젝트 목록 — 이 배열만 수정하면 Projects 섹션과 필터 버튼이 자동으로 갱신됩니다.
// image: assets/ 아래 이미지 경로 (없으면 그라디언트 placeholder 표시)
// demo / github: 링크가 없으면 빈 문자열로 두면 버튼이 숨겨집니다.
window.PROJECTS = [
    {
        title: "포트폴리오 웹사이트",
        description: "Bootstrap을 활용하여 제작한 개인 웹 이력서 및 포트폴리오 사이트입니다. Netlify를 통해 배포되었습니다.",
        tags: ["HTML/CSS", "Bootstrap", "Netlify"],
        category: "Web",
        image: "",
        demo: "/",
        github: "https://github.com/junhyuk0114/Netlify"
    },
    {
        title: "Clone Coding 프로젝트",
        description: "유명 서비스의 메인 페이지를 클론 코딩하여 바닐라 자바스크립트의 기초 및 반응형 레이아웃을 다졌습니다.",
        tags: ["JavaScript", "CSS Grid"],
        category: "Web",
        image: "",
        demo: "",
        github: ""
    },
    {
        title: "To-Do 웹 애플리케이션",
        description: "Local Storage를 활용하여 웹 브라우저가 닫혀도 데이터가 유지되는 할 일 관리 앱을 구현했습니다.",
        tags: ["JavaScript", "Local Storage"],
        category: "App",
        image: "",
        demo: "",
        github: ""
    },
    {
        title: "날씨 정보 대시보드",
        description: "공공 Open API를 연동하여 사용자의 현재 위치 기준 실시간 날씨와 예보 데이터를 보여주는 대시보드입니다.",
        tags: ["JavaScript", "Fetch API"],
        category: "Data",
        image: "",
        demo: "",
        github: ""
    },
    {
        title: "Interactive Web UI",
        description: "CSS Animation과 자바스크립트 스크롤 이벤트를 활용해 동적이고 화려한 인터랙션 인터페이스를 구현했습니다.",
        tags: ["CSS Animation", "JS Event"],
        category: "Web",
        image: "",
        demo: "",
        github: ""
    }
];
