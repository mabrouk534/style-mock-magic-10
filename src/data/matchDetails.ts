
// Match events data
export const matchEvents = {
  "match-1": [
    { time: "15", type: "goal", player: "1", team: "1", description: "هدف مباشر من داخل منطقة الجزاء" },
    { time: "35", type: "yellowCard", player: "1", team: "1", description: "إعاقة لاعب منافس" },
    { time: "42", type: "goal", player: "2", team: "2", description: "هدف من ضربة رأس" },
    { time: "67", type: "goal", player: "1", team: "1", description: "تسديدة من خارج منطقة الجزاء" },
    { time: "78", type: "goal", player: "1", team: "1", description: "ضربة حرة مباشرة" },
  ],
  "match-2": [
    { time: "12", type: "goal", player: "3", team: "3", description: "هدف من هجمة مرتدة سريعة" },
    { time: "24", type: "yellowCard", player: "4", team: "5", description: "تدخل قوي من الخلف" },
    { time: "37", type: "goal", player: "4", team: "5", description: "تسديدة قوية من خارج منطقة الجزاء" },
    { time: "55", type: "goal", player: "3", team: "3", description: "هدف من ركلة ركنية" },
    { time: "61", type: "yellowCard", player: "3", team: "3", description: "إضاعة الوقت" },
    { time: "82", type: "goal", player: "4", team: "5", description: "هدف من متابعة كرة مرتدة" }
  ],
  "match-3": [
    { time: "22", type: "goal", player: "3", team: "3", description: "هدف من ضربة جزاء" },
    { time: "55", type: "goal", player: "1", team: "1", description: "هدف من هجمة مرتدة" },
    { time: "60", type: "yellowCard", player: "3", team: "3", description: "اعتراض على قرار الحكم" },
    { time: "75", type: "redCard", player: "5", team: "4", description: "تدخل عنيف" }
  ],
};

// Match statistics data
export const matchStats = {
  "match-1": { 
    possession: { home: 60, away: 40 }, 
    shots: { home: 12, away: 8 }, 
    shotsOnTarget: { home: 7, away: 4 },
    corners: { home: 8, away: 2 },
    fouls: { home: 10, away: 14 },
    yellowCards: { home: 1, away: 2 },
    redCards: { home: 0, away: 0 }
  },
  "match-2": { 
    possession: { home: 48, away: 52 }, 
    shots: { home: 10, away: 14 }, 
    shotsOnTarget: { home: 5, away: 9 },
    corners: { home: 4, away: 7 },
    fouls: { home: 12, away: 8 },
    yellowCards: { home: 1, away: 1 },
    redCards: { home: 0, away: 0 }
  },
  "match-3": { 
    possession: { home: 45, away: 55 }, 
    shots: { home: 9, away: 11 }, 
    shotsOnTarget: { home: 4, away: 6 },
    corners: { home: 3, away: 7 },
    fouls: { home: 8, away: 6 },
    yellowCards: { home: 0, away: 1 },
    redCards: { home: 0, away: 1 }
  },
};

// Match lineups
export const matchLineups = {
  "match-1": {
    home: ["1"],
    away: ["2"]
  },
  "match-2": {
    home: ["3", "1"],
    away: ["4", "2"]
  },
  "match-3": {
    home: ["5", "3"],
    away: ["6", "4"]
  }
};

// Match referees
export const matchReferees = {
  "match-1": {
    main: "حسام عبدالله",
    assistant1: "محمد أحمد",
    assistant2: "خالد العتيبي",
    fourth: "سعيد القحطاني",
    var: "عبدالرحمن المالكي",
    comments: "أقيمت المباراة في أجواء تنافسية جيدة وبروح رياضية عالية من الفريقين"
  },
  "match-2": {
    main: "عمر الغامدي",
    assistant1: "فهد الشهري",
    assistant2: "ناصر المري",
    fourth: "عبدالله الزهراني",
    var: "يوسف الخضير",
    comments: "مباراة قوية ومثيرة مع العديد من الفرص لكلا الفريقين"
  },
  "match-3": {
    main: "أحمد الشمراني",
    assistant1: "محمد الدوسري",
    assistant2: "فيصل البلوي",
    fourth: "سالم الحربي",
    var: "خالد المرشدي",
    comments: "تم استبعاد لاعب من الفريق الضيف بسبب سلوك عنيف في الدقيقة 75"
  }
};
