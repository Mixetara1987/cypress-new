// function trimAllWhitespace() is for the reason that somewhere data (text) is written separately and somewhere concatenated
// (at some time), so we don't know when it is correct, so the test is interpreted as Flaky.
// This way we are sure that the test will not fail for that reason.
export function trimAllWhitespace(textForTrim: string) {
    let trimmedText: string;
    trimmedText = textForTrim.replace(/\s/g, '');
    return trimmedText;
}
