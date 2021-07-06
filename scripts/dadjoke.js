export const getJoke = () => {
    return fetch("https://icanhazdadjoke.com/", {
      method: "Get",
      headers: {
        Accept: "application/json",
      },
    }).then((response) => response.json())
    //*  BELOW NOT NEEDED if not using parsed data
    .then(parsedResponse => {
        console.log(parsedResponse);
        return parsedResponse;
    })
  };

  export const Joke = (jokeObject) => {
    return `
        <section class="joke">
         
              <h3>${jokeObject.joke}</h3>
          
        </section>
      `;
  };