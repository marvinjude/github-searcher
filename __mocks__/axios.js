const axios = {
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        total_count: 13099,
        incomplete_results: false,
        items: [
          {
            login: "addyosmani",
            id: 110953,
            node_id: "MDQ6VXNlcjExMDk1Mw==",
            avatar_url: "https://avatars.githubusercontent.com/u/110953?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/addyosmani",
            html_url: "https://github.com/addyosmani",
            followers_url: "https://api.github.com/users/addyosmani/followers",
            following_url:
              "https://api.github.com/users/addyosmani/following{/other_user}",
            gists_url:
              "https://api.github.com/users/addyosmani/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/addyosmani/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/addyosmani/subscriptions",
            organizations_url: "https://api.github.com/users/addyosmani/orgs",
            repos_url: "https://api.github.com/users/addyosmani/repos",
            events_url:
              "https://api.github.com/users/addyosmani/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/addyosmani/received_events",
            type: "User",
            site_admin: false,
            score: 1.0,
          },
          {
            login: "spf13",
            id: 173412,
            node_id: "MDQ6VXNlcjE3MzQxMg==",
            avatar_url: "https://avatars.githubusercontent.com/u/173412?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/spf13",
            html_url: "https://github.com/spf13",
            followers_url: "https://api.github.com/users/spf13/followers",
            following_url:
              "https://api.github.com/users/spf13/following{/other_user}",
            gists_url: "https://api.github.com/users/spf13/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/spf13/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/spf13/subscriptions",
            organizations_url: "https://api.github.com/users/spf13/orgs",
            repos_url: "https://api.github.com/users/spf13/repos",
            events_url: "https://api.github.com/users/spf13/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/spf13/received_events",
            type: "User",
            site_admin: false,
            score: 1.0,
          },
          {
            login: "developit",
            id: 105127,
            node_id: "MDQ6VXNlcjEwNTEyNw==",
            avatar_url: "https://avatars.githubusercontent.com/u/105127?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/developit",
            html_url: "https://github.com/developit",
            followers_url: "https://api.github.com/users/developit/followers",
            following_url:
              "https://api.github.com/users/developit/following{/other_user}",
            gists_url: "https://api.github.com/users/developit/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/developit/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/developit/subscriptions",
            organizations_url: "https://api.github.com/users/developit/orgs",
            repos_url: "https://api.github.com/users/developit/repos",
            events_url:
              "https://api.github.com/users/developit/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/developit/received_events",
            type: "User",
            site_admin: false,
            score: 1.0,
          },
          {
            login: "romainguy",
            id: 869684,
            node_id: "MDQ6VXNlcjg2OTY4NA==",
            avatar_url: "https://avatars.githubusercontent.com/u/869684?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/romainguy",
            html_url: "https://github.com/romainguy",
            followers_url: "https://api.github.com/users/romainguy/followers",
            following_url:
              "https://api.github.com/users/romainguy/following{/other_user}",
            gists_url: "https://api.github.com/users/romainguy/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/romainguy/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/romainguy/subscriptions",
            organizations_url: "https://api.github.com/users/romainguy/orgs",
            repos_url: "https://api.github.com/users/romainguy/repos",
            events_url:
              "https://api.github.com/users/romainguy/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/romainguy/received_events",
            type: "User",
            site_admin: false,
            score: 1.0,
          },
          {
            login: "toddmotto",
            id: 1655968,
            node_id: "MDQ6VXNlcjE2NTU5Njg=",
            avatar_url: "https://avatars.githubusercontent.com/u/1655968?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/toddmotto",
            html_url: "https://github.com/toddmotto",
            followers_url: "https://api.github.com/users/toddmotto/followers",
            following_url:
              "https://api.github.com/users/toddmotto/following{/other_user}",
            gists_url: "https://api.github.com/users/toddmotto/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/toddmotto/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/toddmotto/subscriptions",
            organizations_url: "https://api.github.com/users/toddmotto/orgs",
            repos_url: "https://api.github.com/users/toddmotto/repos",
            events_url:
              "https://api.github.com/users/toddmotto/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/toddmotto/received_events",
            type: "User",
            site_admin: false,
            score: 1.0,
          },
          {
            login: "dennybritz",
            id: 403133,
            node_id: "MDQ6VXNlcjQwMzEzMw==",
            avatar_url: "https://avatars.githubusercontent.com/u/403133?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/dennybritz",
            html_url: "https://github.com/dennybritz",
            followers_url: "https://api.github.com/users/dennybritz/followers",
            following_url:
              "https://api.github.com/users/dennybritz/following{/other_user}",
            gists_url:
              "https://api.github.com/users/dennybritz/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/dennybritz/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/dennybritz/subscriptions",
            organizations_url: "https://api.github.com/users/dennybritz/orgs",
            repos_url: "https://api.github.com/users/dennybritz/repos",
            events_url:
              "https://api.github.com/users/dennybritz/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/dennybritz/received_events",
            type: "User",
            site_admin: false,
            score: 1.0,
          },
          {
            login: "wasabeef",
            id: 1833474,
            node_id: "MDQ6VXNlcjE4MzM0NzQ=",
            avatar_url: "https://avatars.githubusercontent.com/u/1833474?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/wasabeef",
            html_url: "https://github.com/wasabeef",
            followers_url: "https://api.github.com/users/wasabeef/followers",
            following_url:
              "https://api.github.com/users/wasabeef/following{/other_user}",
            gists_url: "https://api.github.com/users/wasabeef/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/wasabeef/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/wasabeef/subscriptions",
            organizations_url: "https://api.github.com/users/wasabeef/orgs",
            repos_url: "https://api.github.com/users/wasabeef/repos",
            events_url:
              "https://api.github.com/users/wasabeef/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/wasabeef/received_events",
            type: "User",
            site_admin: false,
            score: 1.0,
          },
          {
            login: "mgechev",
            id: 455023,
            node_id: "MDQ6VXNlcjQ1NTAyMw==",
            avatar_url: "https://avatars.githubusercontent.com/u/455023?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/mgechev",
            html_url: "https://github.com/mgechev",
            followers_url: "https://api.github.com/users/mgechev/followers",
            following_url:
              "https://api.github.com/users/mgechev/following{/other_user}",
            gists_url: "https://api.github.com/users/mgechev/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/mgechev/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/mgechev/subscriptions",
            organizations_url: "https://api.github.com/users/mgechev/orgs",
            repos_url: "https://api.github.com/users/mgechev/repos",
            events_url: "https://api.github.com/users/mgechev/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/mgechev/received_events",
            type: "User",
            site_admin: false,
            score: 1.0,
          },
          {
            login: "mattn",
            id: 10111,
            node_id: "MDQ6VXNlcjEwMTEx",
            avatar_url: "https://avatars.githubusercontent.com/u/10111?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/mattn",
            html_url: "https://github.com/mattn",
            followers_url: "https://api.github.com/users/mattn/followers",
            following_url:
              "https://api.github.com/users/mattn/following{/other_user}",
            gists_url: "https://api.github.com/users/mattn/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/mattn/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/mattn/subscriptions",
            organizations_url: "https://api.github.com/users/mattn/orgs",
            repos_url: "https://api.github.com/users/mattn/repos",
            events_url: "https://api.github.com/users/mattn/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/mattn/received_events",
            type: "User",
            site_admin: false,
            score: 1.0,
          },
        ],
      },
    })
  ),
};

export default axios;
