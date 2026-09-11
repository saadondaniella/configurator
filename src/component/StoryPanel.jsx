function StoryPanel({ form, setForm }) {
  return (
    <section Classname="Story-Panel">
      <p>Once upon a time there was a man called Allan who needed a pill. </p>
      <p>First, he had to choose its shape.</p>
      <button onClick={() => setForm("capsule")}>Capsule</button>
      <button onClick={() => setForm("round")}>Round</button>
      <button onClick={() => setForm("heart")}>Heart</button>

      <p>Selected form: {form} </p>
    </section>
  );
}

export default StoryPanel;