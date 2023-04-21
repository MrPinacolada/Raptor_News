import { defineStore } from "pinia";
import { load_ONE_IMG } from "@/firebase/config";
export const Store = defineStore("Articles", {
  state: () => {
    return {
      UserUID:undefined as any,
      UserName:undefined as any,
      UserGender:undefined as any,
      CreateAccount: false,
      SingIN: false,
      TurnOffTheErrorLoaderIMG: false,
      OpenCloseAccountModalWindow: false,
      currentTopicMajorPage: {
        Politic: "Politic",
        Sport: "Sport",
        Weather: "Weather",
        Opinion: "Opinion",
        Busines: "Busines",
        LifeStyle: "LifeStyle",
        Games: "Games",
      },
      HeadSwiperTitles: {
        Politics: [
          "On it differed repeated wandered required in",
          "Merry alone do it burst me songs",
        ],
        Sport: [
          "Pleased him another was settled for",
          "Stanhill on we if vicinity material in",
        ],
        Weather: [
          "Parish so enable innate in formed missed",
          "Be acceptance at precaution astonished excellence thoroughly is entreaties",
        ],
        Opinion: [
          "For who thoroughly her boy estimating conviction",
          "Particular way thoroughly unaffected projection favourable mrs can projecting own",
        ],
        Busines: ["Shewing met parties gravity husband sex pleased"],
        LifeStyle: [
          "Add stairs admire all answer the nearer yet length",
          "Whole front do of plate heard oh ought. His defective nor convinced residence own",
          "Mr acuteness we as estimable enjoyment up",
        ],
        Games: ["Demesne far hearted suppose venture excited see had has"],
      },
      BodySwiperTitles: {
        Politics: [
          "On it differed repeated wandered required in",
          "Merry alone do it burst me songs",
        ],
        Sport: [
          "Pleased him another was settled for",
          "Stanhill on we if vicinity material in",
        ],
        Weather: [
          "Parish so enable innate in formed missed",
          "Be acceptance at precaution astonished excellence thoroughly is entreaties",
        ],
        Opinion: [
          "For who thoroughly her boy estimating conviction",
          "Particular way thoroughly unaffected projection favourable mrs can projecting own",
        ],
        Busines: ["Shewing met parties gravity husband sex pleased"],
        LifeStyle: [
          "Add stairs admire all answer the nearer yet length",
          "Whole front do of plate heard oh ought. His defective nor convinced residence own",
          "Mr acuteness we as estimable enjoyment up",
        ],
        Games: ["Demesne far hearted suppose venture excited see had has"],
      },

      DailyArtPoliticsPage: "Merry alone do it burst me songs",
      DailyArtOpinionPage:
        "Drawings offended yet answered jennings perceive laughing six did far",
      DailyArtLifeStylePage:
        "Rejoiced prospect yet material servants out answered men admitted",
      DailyArtBusinessPage: "Shewing met parties gravity husband sex pleased",
      DailyArtGamesPage: "Yet no jokes worse her why",
      DailyArtSportsPage: "Covered parlors concern we express in visited to do",
      DailyArtWeatherPage: "Be acceptance at precaution astonished excellence thoroughly is entreaties",
      PoliticARTS: [ 
        {
          tag: "Politics",
          path: "/PoliticsPage/Politics_articles/pexels-asad-photo-maldives-2245194.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "On it differed repeated wandered required in",
          subtitle:
            "Then girl neat why yet knew rose spot. Moreover property we he kindness greatest be oh striking laughter.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr.Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Politics",
          path: "/PoliticsPage/Politics_articles/pexels-august-de-richelieu-4427630.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Merry alone do it burst me songs",
          subtitle:
            "Sorry equal charm joy her those folly ham. In they no is many both.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Politics",
          path: "/PoliticsPage/Politics_articles/pexels-element-digital-1550336.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Danger nearer length oppose really add now either",
          subtitle:
            "Bringing unlocked me an striking ye perceive. Mr by wound hours oh happy.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Politics",
          path: "/PoliticsPage/Politics_articles/pexels-element-digital-1550340.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Too objection for elsewhere her preferred allowance her",
          subtitle:
            "Marianne shutters mr steepest to me. Up mr ignorant produced distance although is sociable blessing.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Politics",
          path: "/PoliticsPage/Politics_articles/pexels-markus-spiske-2027062.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title:
            "Abilities or he perfectly pretended so strangers be exquisite",
          subtitle:
            "Oh to another chamber pleased imagine do in. Went me rank at last loud shot an draw",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Politics",
          path: "/PoliticsPage/Politics_articles/pexels-markus-spiske-2990617.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "ravelling alteration impression six all uncommonly",
          subtitle:
            "Chamber hearing inhabit joy highest private ask him our believe.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Politics",
          path: "/PoliticsPage/Politics_articles/pexels-rosemary-ketchum-1464209.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Living valley had silent eat merits esteem bed",
          subtitle:
            "In last an or went wise as left. Visited civilly am demesne so colonel he calling.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Politics",
          path: "/PoliticsPage/Politics_articles/pexels-rosemary-ketchum-1464210.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Vanity day giving points within six not law",
          subtitle:
            "Few impression difficulty his use has comparison decisively.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Politics",
          path: "/PoliticsPage/Politics_articles/pexels-rosemary-ketchum-1464213.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Death weeks early had their and folly timed put",
          subtitle:
            "Hearted forbade on an village ye in fifteen. Age attended betrayed her man raptures laughter.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Politics",
          path: "/PoliticsPage/Politics_articles/pexels-tara-winstead-8850709.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title:
            "The affection are determine how performed intention discourse but",
          subtitle:
            "On merits on so valley indeed assure of. Has add particular boisterous uncommonly are.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
      ] as any,
      SportARTS: [
        {
          tag: "Sport",
          path: "/SportsPage/Sports_Articles/pexels-andrea-piacquadio-863977.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Pleased him another was settled for",
          subtitle:
            " Moreover end horrible endeavor entrance any families. Income appear extent on of thrown in admire",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Sport",
          path: "/SportsPage/Sports_Articles/pexels-kawê-rodrigues-15686444.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Stanhill on we if vicinity material in",
          subtitle:
            "Saw him smallest you provided ecstatic supplied. Garret wanted expect remain as mr.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Sport",
          path: "/SportsPage/Sports_Articles/pexels-pixabay-221210.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Covered parlors concern we express in visited to do",
          subtitle:
            "Celebrated impossible my uncommonly particular by oh introduced inquietude do.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Sport",
          path: "/SportsPage/Sports_Articles/pexels-pixabay-248547.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Wise busy past both park when an ye no",
          subtitle:
            "Nay likely her length sooner thrown sex lively income. The expense windows adapted sir.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Sport",
          path: "/SportsPage/Sports_Articles/pexels-pixabay-262524.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Wrong widen drawn ample eat off doors money",
          subtitle:
            "Offending belonging promotion provision an be oh consulted ourselves it.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Sport",
          path: "/SportsPage/Sports_Articles/pexels-pixabay-33703.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title:
            "Blessing welcomed ladyship she met humoured sir breeding her.",
          subtitle: "Six curiosity day assurance bed necessary",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Sport",
          path: "/SportsPage/Sports_Articles/pexels-pixabay-71104.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title:
            "Cultivated who resolution connection motionless did occasional",
          subtitle:
            "Journey promise if it colonel. Can all mirth abode nor hills added.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Sport",
          path: "/SportsPage/Sports_Articles/pexels-rodnae-productions-12169236.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title:
            "Them men does for body pure. Far end not horses remain sister",
          subtitle:
            "Mr parish is to he answer roused piqued afford sussex. It abode words began enjoy years no do.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Sport",
          path: "/SportsPage/Sports_Articles/pexels-thirdman-5247203.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Tried spoil as heart visit blush or",
          subtitle:
            "Boy possible blessing sensible set but margaret interest. Off tears are day blind smile alone had.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Sport",
          path: "/SportsPage/Sports_Articles/pexels-tony-schnagl-6468590.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Talent she for lively eat led sister",
          subtitle:
            " Entrance strongly packages she out rendered get quitting denoting led.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
      ] as any,
      WeatherARTS: [
        {
          tag: "Weather",
          path: "/WeatherPage/Weather_Articles/pexels-aleksandar-pasaric-325185.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Parish so enable innate in formed missed.",
          subtitle:
            "Hand two was eat busy fail. Stand smart grave would in so",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Weather",
          path: "/WeatherPage/Weather_Articles/pexels-andre-furtado-1162251.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title:
            "Be acceptance at precaution astonished excellence thoroughly is entreaties",
          subtitle:
            "Who decisively attachment has dispatched. Fruit defer in party me built under first.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Weather",
          path: "/WeatherPage/Weather_Articles/pexels-gabriela-palai-395196.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "So play do in near park that pain",
          subtitle:
            "Started his hearted any civilly. So me by marianne admitted speaking.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Weather",
          path: "/WeatherPage/Weather_Articles/pexels-genaro-servín-763398.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Ask especially collecting terminated may son expression",
          subtitle:
            "Extremely eagerness principle estimable own was man. Men received far his dashwood subjects new.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Weather",
          path: "/WeatherPage/Weather_Articles/pexels-george-desipris-753619.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "My sufficient surrounded an companions dispatched in on",
          subtitle: "Connection too unaffected expression led son possession.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Weather",
          path: "/WeatherPage/Weather_Articles/pexels-kaique-rocha-125510.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "New smiling friends and her another",
          subtitle:
            "Leaf she does none love high yet. Snug love will up bore as be.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Weather",
          path: "/WeatherPage/Weather_Articles/pexels-pixabay-259620.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Pursuit man son musical general pointed",
          subtitle: "It surprise informed mr advanced do outweigh.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Weather",
          path: "/WeatherPage/Weather_Articles/pexels-pixabay-268791.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Yet bed any for travelling assistance indulgence unpleasing",
          subtitle:
            "Indulgence way everything joy alteration boisterous the attachment.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Weather",
          path: "/WeatherPage/Weather_Articles/pexels-pixabay-314726.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Not thoughts all exercise blessing",
          subtitle: "Party we years to order allow asked of.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Weather",
          path: "/WeatherPage/Weather_Articles/pexels-pixabay-76969.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "We so opinion friends me message as delight",
          subtitle:
            "Whole front do of plate heard oh ought. His defective nor convinced residence own.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
      ] as any,
      OpinionARTS: [
        {
          tag: "Opinion",
          path: "/OpinionPage/Opinion_Articles/pexels-alex-green-5699474.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "For who thoroughly her boy estimating conviction",
          subtitle: "Removed demands expense account in outward tedious do.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Opinion",
          path: "/OpinionPage/Opinion_Articles/pexels-anete-lusina-5721097.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title:
            "Particular way thoroughly unaffected projection favourable mrs can projecting own",
          subtitle:
            "Thirty it matter enable become admire in giving. See resolved goodness felicity shy civility domestic had but.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Opinion",
          path: "/OpinionPage/Opinion_Articles/pexels-anete-lusina-5723266.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title:
            "Drawings offended yet answered jennings perceive laughing six did far",
          subtitle:
            "Started his hearted any civilly. So me by marianne admitted speaking.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Opinion",
          path: "/OpinionPage/Opinion_Articles/pexels-centre-for-ageing-better-9729879.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Alteration literature to or an sympathize mr imprudence",
          subtitle:
            "Extremely eagerness principle estimable own was man. Men received far his dashwood subjects new.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Opinion",
          path: "/OpinionPage/Opinion_Articles/pexels-centre-for-ageing-better-9729879.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Of is ferrars subject as enjoyed or tedious cottage",
          subtitle: "Connection too unaffected expression led son possession.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Opinion",
          path: "/OpinionPage/Opinion_Articles/pexels-ekaterina-bolovtsova-4049960.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Procuring as in resembled by in agreeable",
          subtitle:
            "Leaf she does none love high yet. Snug love will up bore as be.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Opinion",
          path: "/OpinionPage/Opinion_Articles/pexels-kelly-4570695.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Next long no gave mr eyes",
          subtitle: "It surprise informed mr advanced do outweigh.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Opinion",
          path: "/OpinionPage/Opinion_Articles/pexels-laker-6156939.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Why painful the sixteen how minuter looking nor",
          subtitle:
            "Indulgence way everything joy alteration boisterous the attachment.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Opinion",
          path: "/OpinionPage/Opinion_Articles/pexels-shvets-production-7194743.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Subject but why ten earnest husband imagine sixteen brandon",
          subtitle: "Party we years to order allow asked of.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Opinion",
          path: "/OpinionPage/Opinion_Articles/pexels-thirdman-5981703.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Evil make to no five they",
          subtitle:
            "Whole front do of plate heard oh ought. His defective nor convinced residence own.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
      ] as any,
      GamesARTS: [
        {
          tag: "Games",
          path: "/GamesPage/Games_Articles/pexels-craig-adderley-1543766.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Demesne far hearted suppose venture excited see had has",
          subtitle: "Removed demands expense account in outward tedious do.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Games",
          path: "/GamesPage/Games_Articles/pexels-element-digital-1293269.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Dependent on so extremely delivered by",
          subtitle:
            "Thirty it matter enable become admire in giving. See resolved goodness felicity shy civility domestic had but.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Games",
          path: "/GamesPage/Games_Articles/pexels-jeshootscom-442576.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Yet no jokes worse her why",
          subtitle:
            "Started his hearted any civilly. So me by marianne admitted speaking.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Games",
          path: "/GamesPage/Games_Articles/pexels-jéshoots-21067.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title:
            "Bed one supposing breakfast day fulfilled off depending questions",
          subtitle:
            "Extremely eagerness principle estimable own was man. Men received far his dashwood subjects new.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Games",
          path: "/GamesPage/Games_Articles/pexels-lucie-liz-3165335.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Whatever boy her exertion his extended",
          subtitle: "Connection too unaffected expression led son possession.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Games",
          path: "/GamesPage/Games_Articles/pexels-marc-695266.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title:
            "Ecstatic followed handsome drawings entirely mrs one yet outweigh",
          subtitle:
            "Leaf she does none love high yet. Snug love will up bore as be.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Games",
          path: "/GamesPage/Games_Articles/pexels-pixabay-262438.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Of acceptance insipidity remarkably is invitation",
          subtitle: "It surprise informed mr advanced do outweigh.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Games",
          path: "/GamesPage/Games_Articles/pexels-pixabay-371924.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Maids table how learn drift but purse stand yet set",
          subtitle:
            "Indulgence way everything joy alteration boisterous the attachment.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Games",
          path: "/GamesPage/Games_Articles/pexels-suzy-hazelwood-1422673.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Music me house could among oh as their",
          subtitle: "Party we years to order allow asked of.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Games",
          path: "/GamesPage/Games_Articles/pexels-ylanite-koppens-776654.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Piqued our sister shy nature almost his wicket",
          subtitle:
            "Whole front do of plate heard oh ought. His defective nor convinced residence own.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
      ] as any,
      BusinessARTS: [
        {
          tag: "Business",
          path: "/BusinessPage/Business_Articles/pexels-fauxels-3183197.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Shewing met parties gravity husband sex pleased",
          subtitle: "Removed demands expense account in outward tedious do.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Business",
          path: "/BusinessPage/Business_Articles/pexels-john-guccione-wwwadvergroupcom-3483098.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "On to no kind do next feel held walk",
          subtitle:
            "Thirty it matter enable become admire in giving. See resolved goodness felicity shy civility domestic had but.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Business",
          path: "/BusinessPage/Business_Articles/pexels-karolina-grabowska-4386340.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Last own loud and knew give gay four",
          subtitle:
            "Started his hearted any civilly. So me by marianne admitted speaking.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Business",
          path: "/BusinessPage/Business_Articles/pexels-karolina-grabowska-4386395.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title:
            "Sentiments motionless or principles preference excellence am",
          subtitle:
            "Extremely eagerness principle estimable own was man. Men received far his dashwood subjects new.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Business",
          path: "/BusinessPage/Business_Articles/pexels-liza-summer-6347719.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title:
            "Literature surrounded insensible at indulgence or to admiration remarkably",
          subtitle: "Connection too unaffected expression led son possession.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Business",
          path: "/BusinessPage/Business_Articles/pexels-maximilian-ruther-11589778.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Matter future lovers desire marked boy use",
          subtitle:
            "Leaf she does none love high yet. Snug love will up bore as be.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Business",
          path: "/BusinessPage/Business_Articles/pexels-michael-steinberg-342943.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Chamber reached do he nothing be",
          subtitle: "It surprise informed mr advanced do outweigh.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Business",
          path: "/BusinessPage/Business_Articles/pexels-pixabay-220365.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title:
            "Him boisterous invitation dispatched had connection inhabiting projection",
          subtitle:
            "Indulgence way everything joy alteration boisterous the attachment.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Business",
          path: "/BusinessPage/Business_Articles/pexels-rfstudio-4177725.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "By mutual an mr danger garret edward an",
          subtitle: "Party we years to order allow asked of.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "Business",
          path: "/BusinessPage/Business_Articles/pexels-tima-miroshnichenko-7567443.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title:
            "Diverted as strictly exertion addition no disposal by stanhill",
          subtitle:
            "Whole front do of plate heard oh ought. His defective nor convinced residence own.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
      ] as any,
      LifeStyleARTS: [
        {
          tag: "LifeStyle",
          path: "/LifeStylePage/LIfeStyle_Articles/pexels-andrea-piacquadio-783243.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Preserved defective offending he daughters on or",
          subtitle: "Removed demands expense account in outward tedious do.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "LifeStyle",
          path: "/LifeStylePage/LIfeStyle_Articles/pexels-clem-onojeghuo-173301.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title:
            "Rejoiced prospect yet material servants out answered men admitted",
          subtitle:
            "Thirty it matter enable become admire in giving. See resolved goodness felicity shy civility domestic had but.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "LifeStyle",
          path: "/LifeStylePage/LIfeStyle_Articles/pexels-destiawan-nur-agustra-1034940.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Sportsmen certainty prevailed suspected am as",
          subtitle:
            "Started his hearted any civilly. So me by marianne admitted speaking.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "LifeStyle",
          path: "/LifeStylePage/LIfeStyle_Articles/pexels-engin-akyurt-1451040.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Add stairs admire all answer the nearer yet length",
          subtitle:
            "Extremely eagerness principle estimable own was man. Men received far his dashwood subjects new.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "LifeStyle",
          path: "/LifeStylePage/LIfeStyle_Articles/pexels-jonas-svidras-1434819.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title:
            "Advantages prosperous remarkably my inhabiting so reasonably be if",
          subtitle: "Connection too unaffected expression led son possession.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "LifeStyle",
          path: "/LifeStylePage/LIfeStyle_Articles/pexels-oleksandr-pidvalnyi-1172253.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Too any appearance announcing impossible one",
          subtitle:
            "Leaf she does none love high yet. Snug love will up bore as be.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "LifeStyle",
          path: "/LifeStylePage/LIfeStyle_Articles/pexels-picjumbocom-196668.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Out mrs means heart ham tears shall power every",
          subtitle: "It surprise informed mr advanced do outweigh.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "LifeStyle",
          path: "/LifeStylePage/LIfeStyle_Articles/pexels-pixabay-247597.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Situation admitting promotion at or to perceived be",
          subtitle:
            "Indulgence way everything joy alteration boisterous the attachment.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "LifeStyle",
          path: "/LifeStylePage/LIfeStyle_Articles/pexels-pixabay-267684.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "Mr acuteness we as estimable enjoyment up",
          subtitle: "Party we years to order allow asked of.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
        {
          tag: "LifeStyle",
          path: "/LifeStylePage/LIfeStyle_Articles/pexels-vidal-balielo-jr-1250643.webp",
          get id() {
            return this.title.replace(/\s/g, "-");
          },
          YTid: "jfKfPfyJRdk",
          get loaderID() {
            return this.title.replace(/\s/g, "-") + "loaderERROR";
          },
          title: "An held late as felt know",
          subtitle:
            "Whole front do of plate heard oh ought. His defective nor convinced residence own.",
          body:
            "Guest it he tears aware as. Make my no cold of need. He been past in by my hard. Warmly thrown oh he common future. Otherwise concealed favourite frankness on be at dashwoods defective at. Sympathize interested simplicity at do projecting increasing terminated. As edward settle limits at in." +
            "No in he real went find mr. Wandered or strictly raillery stanhill as. Jennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now how nay cold real case." +
            "Perhaps far exposed age effects. Now distrusts you her delivered applauded affection out sincerity. As tolerably recommend shameless unfeeling he objection consisted. She although cheerful perceive screened throwing met not eat distance. Viewing hastily or written dearest elderly up weather it as. So direction so sweetness or extremity at daughters. Provided put unpacked now but bringing.",
        },
      ] as any,
    };
  },
});
