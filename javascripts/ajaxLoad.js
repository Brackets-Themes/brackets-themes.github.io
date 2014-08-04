$.getJSON("themes.json").done(function (data) {
  function escapeAttr(attr) {
    return attr
      .replace("&", "&amp;")
      .replace("\"", "&quot;");
  }

  var displayContent = "",
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

  for (var i = 0; i < data.length; i++) {
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

        displayContent += "<h4 id=\"" + escapeAttr(id) + "\">";
        displayContent += "<a href='" + themeURL + "'>" + $("<div>").text(name).html() + "</a>";
        displayContent += "</h4><p>";
        displayContent += "<a href='" + screenURL + "'>";
        displayContent += "<img src='" + screenURL + "' alt=\"Screenshot: " + escapeAttr(name) + "\">";
        displayContent += "</a></p>";
      }
    }
  }
  if (displayContent) {
    $("#themes").html(displayContent);
  }
});
