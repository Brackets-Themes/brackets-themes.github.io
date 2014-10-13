$.getJSON("themes.json").done(function (data) {
  function escapeAttr(attr) {
    return attr
      .replace("&", "&amp;")
      .replace("\"", "&quot;");
  }

  var displayContent = "",
      i,
      theme,
      user,
      repo,
      name,
      id,
      screen,
      themeURL,
      screenURL;

  // Sort themes alphabetically
  data.sort(function (theme1, theme2) {
    var name1 = theme1.name || theme1.repo,
        name2 = theme2.name || theme2.repo;
    return name1.localeCompare(name2);
  });

  for (i = 0; i < data.length; i++) {
    theme = data[i];
    if (theme) {
      user    = theme.user || "Brackets-Themes";
      repo    = theme.repo;
      name    = theme.name || theme.repo;
      id      = name.toLowerCase().replace(/[^\w ]/g, "").split(" ").join("-");
      screen  = theme.screen;
      if (repo && screen) { // Required data
        themeURL = encodeURI("https://github.com/" + user + "/" + repo);
        screenURL = encodeURI("https://raw.githubusercontent.com/" + user + "/" + repo + "/master/" + screen);

        displayContent += '<h4 id="' + escapeAttr(id) + '">';
        displayContent += '<a href="' + themeURL + '">' + $("<div>").text(name).html() + '</a>';
        displayContent += '</h4><p>';
        displayContent += '<a href="' + screenURL + '">';
        displayContent += '<img src="' + screenURL + '" alt="Screenshot: ' + escapeAttr(name) + '">';
        displayContent += '</a></p>';
      }
    }
  }

  if (displayContent) {
    $("#themes").html(displayContent);
  }
});

$.getJSON("https://api.github.com/orgs/Brackets-Themes/members?per_page=100").done(function (data) {
  var displayContent = "", i, member;

  for (i = 0; i < data.length; i++) {
    member = data[i];
    displayContent += '<a href="' + member.html_url + '">';
    displayContent += '<img src="' + member.avatar_url.split("?")[0] + '?s=64" title="' + member.login + '">';
    displayContent += '</a>';
  }

  if (displayContent) {
    $("#people").html(displayContent);
  }
});
