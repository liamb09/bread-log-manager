function doGet(e) {
  return HtmlService.createHtmlOutputFromFile("EntryPage").addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function addEntry(selection, d) {
  var body = DocumentApp.getActiveDocument().getBody();
  var data = JSON.parse(d);
  if (selection == "new-recipe") {
    body.insertParagraph(0, `${data.recipeName} ${data.startDate}`);
    body.getParagraphs()[0].setHeading(DocumentApp.ParagraphHeading.HEADING1);

    body.insertParagraph(1, `${data.description}`);

    data.sections.split("\n").forEach(function(section, index) {
      body.insertParagraph(2 + index*2, `${section}`).setHeading(DocumentApp.ParagraphHeading.HEADING2);
      body.insertParagraph(2 + index*2 + 1, `{${data.recipeName}-${data.startDate}-${section}}\n`);
    });
  } else if (selection == "recipe-section") {
    // determine section identifier
    const lastSpaceIndex = data.recipeName.lastIndexOf(" ");
    const sectionIdentifier = `{${data.recipeName.substring(0, lastSpaceIndex)}-${data.recipeName.substring(lastSpaceIndex+1)}-${data.section}}`;

    // locate area to add new text and delete placeholder
    const searchResult = body.findText(sectionIdentifier);
    var sectionElement = searchResult.getElement().editAsText();
    sectionElement.deleteText(searchResult.getStartOffset(), searchResult.getEndOffsetInclusive());
    var currentElementIndex = body.getChildIndex(sectionElement.getParent());

    // add subtitle
    if (data.subtitle != '') {
      sectionElement.insertText(0, `${data.subtitle}`);
      currentElementIndex++;
    }
    
    // add table
    if (data.ingredients != '') {
      var ingredientsTable = [["Ingredient", "Mass"]];
      data.ingredients.split("\n").forEach(function(line) {
        ingredientsTable.push(line.split("."));
      });
      // set column widths
      ingredientsTable = body.insertTable(currentElementIndex, ingredientsTable);
      ingredientsTable.setColumnWidth(0, 427);
      ingredientsTable.setColumnWidth(1, 41);

      // set header row to bold
      var cell0 = ingredientsTable.getRow(0).getCell(0).editAsText();
      var cell1 = ingredientsTable.getRow(0).getCell(1).editAsText();
      cell0.setBold(0, cell0.getText().length - 1, true);
      cell1.setBold(0, cell1.getText().length - 1, true);

      // set header row cell background color to grey
      ingredientsTable.getRow(0).getCell(0).editAsText().setBackgroundColor("#EFEFEF");
      ingredientsTable.getRow(0).getCell(1).editAsText().setBackgroundColor("#EFEFEF");
      currentElementIndex++;

      for (var row = 1; row < ingredientsTable.getNumRows(); row++) {
        for (var col = 0; col < ingredientsTable.getRow(0).getNumCells(); col++) {
          Logger.log(`${row},${col}`);
          ingredientsTable.getRow(row).getCell(col).editAsText().setBold(false);
        }
      }
    }

    // add steps
    if (data.steps != '') {
      // add steps header
      sectionElement = body.insertParagraph(currentElementIndex, "").editAsText();
      sectionElement.appendText("Steps");
      sectionElement.setBold(0, 4, true);
      if (data.ingredients != '') {
        sectionElement.insertText(0, "\n");
      }
      currentElementIndex++;

      // add steps list
      data.steps.split("\n").forEach(function (step) {
        const listItem = body.insertListItem(currentElementIndex, step);
        listItem.setGlyphType(DocumentApp.GlyphType.NUMBER);

        const listItemText = listItem.asListItem().editAsText();
        listItemText.setFontFamily("Times New Roman");
        listItemText.setBold(false);
        currentElementIndex++;
      });
    }

    // add notes
    const onlyNotes = (data.subtitle == '' && data.ingredients == '' && data.steps == '');
    if (!onlyNotes) {
      sectionElement = body.insertParagraph(currentElementIndex, "").editAsText();
      sectionElement.appendText("\nNotes");
      sectionElement.setBold(1, 5, true);
      currentElementIndex++;
    }

    if (data.notes != '') {
      // add notes list
      data.notes.split("\n").forEach(function (note) {
        const listItem = body.insertListItem(currentElementIndex, note);
        listItem.setGlyphType(DocumentApp.GlyphType.NUMBER);

        const listItemText = listItem.asListItem().editAsText();
        listItemText.setFontFamily("Times New Roman");
        listItemText.setBold(false);
        currentElementIndex++;
      });
    } else {
      sectionElement.appendText("\nNone").setBold(sectionElement.getText().length-4, sectionElement.getText().length-1, false);
    }
  }
}
