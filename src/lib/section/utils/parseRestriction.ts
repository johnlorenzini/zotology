const codeObj = {
  A: "Prerequisite required",
  B: "Auth code required",
  C: "Fee required",
  D: "Pass/Not Pass only",
  E: "Freshmen only",
  F: "Sophomores only",
  G: "Lower-division only",
  H: "Juniors only",
  I: "Seniors only",
  J: "Upper-division only",
  K: "Graduate only",
  L: "Major only",
  M: "Non-major only",
  N: "School major only",
  O: "Non-school major only",
  R: "Biomed Pass/Fail course",
  S: "Satisfactory/Unsatisfactory only",
  X: "Separate auth codes required",
};

const codeMap: Map<string, string> = new Map(Object.entries(codeObj));

export const parseRestriction = (restr: string): Array<string> => {
  // Attempt to hash string
  let desc = codeMap.get(restr);

  if (desc) {
    // single letter
    return [desc];
  } else {
    // multiple letter
    const restrRegex = /(\w)\W+and\W+(\w)/;
    const matchArray = restr.match(restrRegex)!;
    return [
      codeMap.get(matchArray?.at(1) ?? "") ?? "",
      codeMap.get(matchArray?.at(2) ?? "") ?? "",
    ];
  }
  return [""];
};
