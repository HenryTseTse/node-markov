/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // Create Chains Map
    let chains = new Map();

    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i]; // current word
      let nextWord = this.words[i + 1] || null; // if next word, or null

      if (chains.has(word)) chains.get(word).push(nextWord); // if word exist in chains push next word into key:value array
      else chains.set(word, [nextWord]); // else create key as word and set value as next word
    }

    this.chains = chains; 
  }

  /** return random choice from array */

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // pick a random key
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    // produce markov chain until null
    while (out.length < numWords && key != null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key)); // random key for next word
    }

    return out.join(" ");
  }
}

let mm = new MarkovMachine("the cat in the hat");
console.log(mm.chains)
mm.makeText();
console.log(mm.makeText(numWords=50));


module.exports = {
  MarkovMachine,
};
