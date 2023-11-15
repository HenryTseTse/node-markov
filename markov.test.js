const { MarkovMachine } = require("./markov");

describe ("markov machine", function() {
    test('makes chain', function() {
        let mm = new MarkovMachine("the cat in the hat")

        expect(mm.chains).toEqual(new Map([
            ['the', [ 'cat', 'hat' ]],
                ['cat', [ 'in' ]],
                ['in', [ 'the' ]],
                ['hat', [ null ]]]));
    });

    test('choice picks from array', function() {
        expect(MarkovMachine.choice([1,1,1])).toEqual(1);
        expect([1,2,3]).toContain(MarkovMachine.choice([1,2,3]));
    })

    test('generates semi-predictable text', function () {
        let mm = new MarkovMachine("a b c");
        let text = mm.makeText();
        expect(["a b c", "b c", "c"]).toContain(text);
    })

    test('generates valid text', function () {
        let bigrams = ["the cat", "cat in", "in the", "the hat", "hat"];
        let mm = new MarkovMachine("the cat in the hat")
        let output = mm.makeText();
        expect(output.endsWith('hat')).toBe(true);

        let outputWords = mm.makeText().split(/[ \r\n]+/);

        for (let i = 0; i < outputWords.length - 1; i++) {
            expect(bigrams).toContain(outputWords[i] + " " + outputWords[i+1]);
        }
    });

    test('cuts off at length', function () {
        let mm = new MarkovMachine("the cat in the hat");
        let output = mm.makeText(3);

        let outputWords = output.split(/[ \r\n]+/);
        expect([1,2,3]).toContain(outputWords.length);
    });
});