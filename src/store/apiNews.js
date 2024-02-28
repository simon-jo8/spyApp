import { defineStore } from "pinia";
import axios from "redaxios";

export const useNewsStore = defineStore("News", {
  state: () => ({
    newsTitles: null,
    test: "test",
    scenarioDesc: [],
    scenarioLocations: [],
    scenarios: [],
    loadingState : 0,
  }),
  actions: {
    async fetchNews() {
      try {
        this.loadingState = 1;
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=fr&apiKey=c603dbef27df4af8b3ab80864dbaff7b&pageSize=10"
        );
        let news = response.data.articles;
        let titles = [];
        for (let i = 0; i < 10; i++) {
          titles.push(news[i].title);
        }
        this.loadingState = 2;
        if(titles){
          let scenarioDescList = [];
          try {
            for(let i = 0; i < titles.length; i++){
              const requestBody = {
                "messages": [
                  { "role": "system", "content": "Vous allez recevoir une actualité, il faut créer un scénario pour une mission d'espionnage à partir de cette actualité. Je veux une réponse en Français" },
                  { "role": "user", "content": titles[i] }
                ],
                "temperature": 0.7,
                "max_tokens": -1,
                "stream": false
              };
              const response = await axios.post(
                  "http://localhost:1234/v1/chat/completions",
                  requestBody
              );
              let scenarioDesc = response.data.choices[0].message.content;
              scenarioDescList.push(scenarioDesc);
              this.scenarios.push({scenarioDesc: scenarioDesc});
              this.scenarioDesc.push(scenarioDesc);
              this.loadingState = 3;
            }
          } catch(error) {
            console.error(error);
          }

          if(scenarioDescList){
            try{
              for(let i = 0; i < scenarioDescList.length; i++){
                const requestBody = {
                  "messages": [
                    { "role": "system", "content": "Prenant en compte ce scenario je veux que tu généres une liste de 5 lieux physique en lien avec ce scenario, je veux que tu retournes uniquement le nom du lieu sous la forme suivante :[lieu1,lieu2,lieu3,lieu4,lieu5]" },
                    { "role": "user", "content": scenarioDescList[i] }
                  ],
                  "temperature": 0.7,
                  "max_tokens": -1,
                  "stream": false
                };
                const response = await axios.post(
                    "http://localhost:1234/v1/chat/completions",
                    requestBody
                );
                let clearString = response.data.choices[0].message.content.replace("\n","").slice(1, -1);
                let listEvent = clearString.split(",");
                this.scenarios[i] = {...this.scenarios[i], scenarioLocations: listEvent};
                this.loadingState = 4;
              }
            }catch (error) {
              console.error(error);
            }
          }
          if(scenarioDescList){
            try{
              for(let i = 0; i < scenarioDescList.length; i++){
                const requestBody = {
                  "messages": [
                    { "role": "system", "content": "Prenant en compte ce scenario je veux que tu généres une liste de 5 personnes qui vont être lié a ce scenario, je veux que tu retournes uniquement le nom des personnages sous la forme suivante :[perso1,perso2,perso3,perso4,perso5]" },
                    { "role": "user", "content": scenarioDescList[i] }
                  ],
                  "temperature": 0.7,
                  "max_tokens": -1,
                  "stream": false
                };
                const response = await axios.post(
                    "http://localhost:1234/v1/chat/completions",
                    requestBody
                );
                let clearString = response.data.choices[0].message.content.replace("\n","").slice(1, -1);
                let listEvent = clearString.split(",");
                this.scenarios[i] = {...this.scenarios[i], personnages: listEvent};
                this.loadingState = 5;
              }
            }catch (error) {
              console.error(error);
            }
          }

          if(this.scenarios) {
            for (let i = 0; i < this.scenarios.length; i++) {
              const pushPersonages = () => {
                for(let j = 0; j < this.scenarios[i].personnages.length; j++){
                  axios
                      .post(
                          "https://fsfahuwxzvtcnnxnzrtz.supabase.co/rest/v1/pngs",
                          {
                            created_at: new Date().toISOString(),
                            name: this.scenarios[i].personnages[j],
                          },
                          {
                            headers: {
                              apikey:
                                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZmFodXd4enZ0Y25ueG56cnR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NTcyNTQsImV4cCI6MjAyNDUzMzI1NH0.AMEtFXvcO1XqHLK51pv5ARRuc7Q6ICIUuENraYHXHYQ",
                              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZmFodXd4enZ0Y25ueG56cnR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NTcyNTQsImV4cCI6MjAyNDUzMzI1NH0.AMEtFXvcO1XqHLK51pv5ARRuc7Q6ICIUuENraYHXHYQ`,
                            },
                          }
                      )
                      .then((response) => {
                        console.log(response);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                }
              }
              const pushLocations = () => {
                for(let j = 0; j < this.scenarios[i].scenarioLocations.length; j++){
                  axios
                      .post(
                          "https://fsfahuwxzvtcnnxnzrtz.supabase.co/rest/v1/places",
                          {
                            created_at: new Date().toISOString(),
                            name: this.scenarios[i].scenarioLocations[j],
                          },
                          {
                            headers: {
                              apikey:
                                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZmFodXd4enZ0Y25ueG56cnR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NTcyNTQsImV4cCI6MjAyNDUzMzI1NH0.AMEtFXvcO1XqHLK51pv5ARRuc7Q6ICIUuENraYHXHYQ",
                              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZmFodXd4enZ0Y25ueG56cnR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NTcyNTQsImV4cCI6MjAyNDUzMzI1NH0.AMEtFXvcO1XqHLK51pv5ARRuc7Q6ICIUuENraYHXHYQ`,
                            },
                          }
                      )
                      .then((response) => {
                        console.log(response);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                }
              };
              const submit = () => {
                axios
                    .post(
                        "https://fsfahuwxzvtcnnxnzrtz.supabase.co/rest/v1/scenarios",
                        {
                          created_at: new Date().toISOString(),
                          description: this.scenarios[i].scenarioDesc,
                          place:"",
                          score: 0,
                        },
                        {
                          headers: {
                            apikey:
                                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZmFodXd4enZ0Y25ueG56cnR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NTcyNTQsImV4cCI6MjAyNDUzMzI1NH0.AMEtFXvcO1XqHLK51pv5ARRuc7Q6ICIUuENraYHXHYQ",
                            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZmFodXd4enZ0Y25ueG56cnR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NTcyNTQsImV4cCI6MjAyNDUzMzI1NH0.AMEtFXvcO1XqHLK51pv5ARRuc7Q6ICIUuENraYHXHYQ`,
                          },
                        }
                    )
                    .then((response) => {
                      pushPersonages();
                      pushLocations();
                    })
                    .catch((error) => {
                      console.log(error);
                    });
              };
              submit();
            }

            let news = response.data;
            console.log(news);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
