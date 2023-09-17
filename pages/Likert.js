const Likert = function(id, question, subtitles, score = 0) {
  this.id = id;
  this.question = question;
  this.subtitles = subtitles;
  this.score = score;
};

export default Likert;
