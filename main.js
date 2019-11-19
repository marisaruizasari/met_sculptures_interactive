/*global d3 */

// images for landing --------------------------------------------->

var landingPhotos = ["270532", "DP-15823-001", "DP104826", "DP123379", "DP250574", "DP256401", "DP276954", "DP295640", "DT2570", "DT4966", "DT5716", "DT241328"]
// var landingPhotos = ["270532", "DP-15823-001", "DP104826", "DP123379", "DP164044", "DP250574", "DP256401", "DP276954", "DP295640", "DT2570", "DT4966", "DT5716", "DT241328", "LK", "SF30_135_2", "SF2005_108_3_ front"]


var imgDiv = document.createElement("div")
imgDiv.className = "landing-img-div"


for (var p=0; p<landingPhotos.length; p++) {
  var img = document.createElement("img");
  img.src = `images/landing-images/${landingPhotos[p]}.png`
  img.className = "landingImgs"
  imgDiv.appendChild(img)
}

document.getElementById("landing-images").appendChild(imgDiv);



// range slider for heights ----------------------------------------------->

var testSlider = d3.select('div#slider-test')
    .append('svg')
    .attr('width', 80)
    .attr('height', 350)
    .append('g')
    .attr('transform', 'translate(5,-15)')
    .attr("class", "slider-svg");
    // .attr("class", "slider-container");

var slider2 = d3
    .sliderLeft()
    .min(0)
    .max(550)
    .height(300)
    .ticks(5)
    .default([0, 550])
    .fill('#55585C')
    .on('onchange', val => {
      d3.select('p#value-range').text(val);
      console.log(val);
    });

testSlider
    .append('g')
    .attr('transform', `translate(50,30)`)
    .call(slider2);

d3.select('p#value-range').html(
    `<strong>Current Selection:</strong> <br> ${slider2.value().join('-')} centimeters<br><p class="in-ft">(0–${parseFloat(550*0.393701).toFixed(1)} inches)</p><br><p class="in-ft">(0–${parseFloat(550*0.0328084).toFixed(1)} feet)</p>`
  );


//bar chart function ----------------------------------------------->

var svgWidth = 500;
var svgHeight = 500;

var svg = d3.select('div#bar-chart')
  .append('svg')
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("class", "bars");


function drawBars(dataDrawn) {

var barPadding = 16;
var barWidth = (svgWidth/dataDrawn.length);

var barChart = svg.append("g").selectAll("rect")
    .data(dataDrawn)
    .join("rect")
    .attr("class", "bars")
    .attr("y", function(d) {
        return svgHeight - d.count
    })
    .attr("height", function(d) {
        return d.count;
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function (d, i) {
        var translate = [50+((barWidth-8)*i), -30];
        return "translate("+ translate +")";
    })
    .attr("fill", function(d, i) {
    var color = colors[i]
    return color
    });


};

// on bar click functions ------------------------------------------->

// image display function    https://stackoverflow.com/questions/41087774/display-images-array-onclick-button
function displayImage (src, width, alt, className, parentElement, parentClassName) {


			var img = document.createElement("img");
			img.src = src;
			img.width = width;
			img.alt = alt;
			img.className = className

			if (parentClassName) {
			  var imgDiv = document.createElement("div");
			  imgDiv.className = parentClassName

			  imgDiv.appendChild(img)

        var removeIcon = document.createElement("img")
        removeIcon.className = "remove-icon"
        removeIcon.src = "remove.png"

        imgDiv.appendChild(removeIcon)

			  document.querySelector(parentElement).appendChild(imgDiv);

			} else {
			  document.querySelector(parentElement).appendChild(img);
			}


		}

// render each image function
function renderEachImage(array, className, parentElement, parentClassName) {

			for(var i = 0; i < array.length; i++){
				displayImage(`resized_clipped_tranparent_png/${array[i].fileName.split('.')[0]}.png`, "50px", i, className, parentElement, parentClassName)
			}

}





// function to remove images before rendering new ones  https://www.abeautifulsite.net/adding-and-removing-elements-on-the-fly-using-javascript

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function removeElementsByClass(query) {
    // Removes an element from the document
    var classList = document.querySelectorAll(query);
    for (element of classList) {
      element.parentNode.removeChild(element);
    }
}

//legend ----------------------------------------------->

var colors = ["#FFDC47","#755A52","#E8DED3","#C7AFA5","#C77564","#F9EED7","#C2894B","#D3DADA","#DFDEDA","#FFEAE4","#DDDEC7"];
var materialNames = ["gold", "wood", "marble", "stone", "terracotta", "ivory", "bronze", "silver", "ceramic", "alabaster", "plaster"];
var materialNamesCap = ["Gold", "Wood", "Marble", "Stone", "Terracotta", "Ivory", "Bronze", "Silver", "Ceramic", "Alabaster", "Plaster"];


var legendSquares = d3.select('div#legendSquares')
  .append("svg")
  .attr("height", 250)
  .attr("width", 30);


  var sqArea = 21;
  var sqHeight = 15;

  legendSquares.append("g").selectAll("rect")
    .data(colors)
    .enter()
    .append("rect")
    .attr("y", function(d, i) {
      return ((sqArea * i)+15)
    })
    .attr("height", sqHeight)
    .attr("width", sqHeight)
    .attr("fill", function(d) {
      return d
    });

    var legendText = d3.select('div#legend')
  .attr("height", 600)
  .attr("width", 500)
  .attr("transform", "translate(50,200");

  var initialCounts = [54,522,355,432,103,50,487,73,156,37,67]

  legendText.html("Gold: " + initialCounts[0] + "<br/>"
  + "Wood: " + initialCounts[1] + "<br/>"
  + "Marble: " + initialCounts[2] + "<br/>"
  + "Stone: " + initialCounts[3] + "<br/>"
  + "Terracotta: " + initialCounts[4] + "<br/>"
  + "Ivory: " + initialCounts[5] + "<br/>"
  + "Bronze: " + initialCounts[6] + "<br/>"
  + "Silver: " + initialCounts[7] + "<br/>"
  + "Ceramic: " + initialCounts[8] + "<br/>"
  + "Alabaster: " + initialCounts[9] + "<br/>"
  + "Plaster: " + initialCounts[10])




// draw using sculpture data ----------------------------------------------->

d3.json("full.json").then(data => {
  console.log("-----------------------------full data:")
  console.log(data);


  //image json data
  var imageArray = [];

  d3.json("finalClippedFileAndHeight.json").then(images => {
    images.forEach(image => {
      imageArray.push(image)
    })
  });

  console.log("------------imageArray:")
  console.log(imageArray)


// to create percents instead of counts
var initialBase = data.length/500

// materials and PERCENTS for initial drawing of bars on page load
var startMaterialCounts = [{material: "Gold", count: 54/initialBase},
                           {material: "Wood", count: 522/initialBase},
                           {material: "Marble", count: 355/initialBase},
                           {material: "Stone", count: 432/initialBase},
                           {material: "Terracotta", count: 103/initialBase},
                           {material: "Ivory", count: 50/initialBase},
                           {material: "Bronze", count: 487/initialBase},
                           {material: "Silver", count: 73/initialBase},
                           {material: "Ceramic", count: 156/initialBase},
                           {material: "Alabaster", count: 37/initialBase},
                           {material: "Plaster", count: 67/initialBase}];

//draw initial bars
drawBars(startMaterialCounts);
svg.selectAll("rect")
  .attr("class", "individual-bars");



//scales
 var formatPercent = d3.format(".0%");


 var yScale = d3.scaleLinear()
                  .domain([1, 0])
                  .range([5, svgHeight-30]);

 var yAxis = d3.axisLeft()
                   .scale(yScale)
                   .tickFormat(formatPercent);


  svg.append("g")
  .call(yAxis)
  .attr("transform", "translate(40,0)");

  svg.append("line")
    .style("stroke", "black")
    .attr("x1", 45)     // x position of the first end of the line
    .attr("y1", 471)      // y position of the first end of the line
    .attr("x2", 480)     // x position of the second end of the line
    .attr("y2", 471);    // y position of the second end of the line

  // svg.append("g").append("div")
  //   .attr("class", "x-axis-text")
  //   .text("Sculpture Material")



var sculptureArray = [];
var materialArray = [];
var goldArray = [];
var woodArray = [];
var marbleArray = [];
var stoneArray = [];
var terracottaArray = [];
var ivoryArray = [];
var bronzeArray = [];
var silverArray = [];
var ceramicArray = [];
var alabasterArray = [];
var plasterArray = [];

// when slider changes, create data arrays for bar chart
slider2.on('onchange', vals => {

  // var intVals = parseInt(slider2.value())

  var lowerValueInt = parseInt(slider2.value()[0]);
  var upperValueInt = parseInt(slider2.value()[1]);

  d3.select('p#value-range').html(

      `<strong>Current Selection:</strong> <br> ${lowerValueInt}–${upperValueInt} centimeters<br><p class="in-ft">(${parseFloat(lowerValueInt*0.393701).toFixed(1)}–${parseFloat(upperValueInt*0.393701).toFixed(1)} inches)</p><br><p class="in-ft">(${parseFloat(lowerValueInt*0.0328084).toFixed(1)}–${parseFloat(upperValueInt*0.0328084).toFixed(1)} feet)</p>`
  );

  var sculpturesInSliderRange = [];
  console.log("Range values: " + vals)
  var upperBound = vals[1];
  var lowerBound = vals[0];
  console.log("***")

  data.forEach(object => {
    if (object.height <= upperBound && object.height >= lowerBound) {
      sculpturesInSliderRange.push(object)
    }
  });

  var rangeCount = d3.select('div#sculpture-range-count')
  rangeCount.html(`<p class="range-detail">Total Sculptures<br>in Range:</p><p class="range-number">${sculpturesInSliderRange.length}</p>`)


  console.log("total sculptures in range: " + sculpturesInSliderRange.length);
  console.log("***")

  var gold = [];
  var wood = [];
  var marble = [];
  var stone = [];
  var terracotta = [];
  var ivory = [];
  var bronze = [];
  var silver = [];
  var ceramic = [];
  var alabaster = [];
  var plaster = [];

  var materialArrays = [gold, wood, marble, stone, terracotta, ivory, bronze, silver, ceramic, alabaster, plaster]


  sculpturesInSliderRange.forEach(rangedSculpture => {

    mediumArray(rangedSculpture, gold, "gold", "Gold");
    mediumArray(rangedSculpture, wood, "wood", "Wood");
    mediumArray(rangedSculpture, marble, "marble", "Marble");
    mediumArray(rangedSculpture, stone, "stone", "Stone");
    mediumArray(rangedSculpture, terracotta, "terracotta", "Terracotta");
    mediumArray(rangedSculpture, ivory, "ivory", "Ivory");
    mediumArray(rangedSculpture, bronze, "bronze", "Bronze");
    mediumArray(rangedSculpture, silver, "silver", "Silver");
    mediumArray(rangedSculpture, ceramic, "ceramic", "Ceramic");
    mediumArray(rangedSculpture, alabaster, "alabaster", "Alabaster");
    mediumArray(rangedSculpture, plaster, "plaster", "Plaster");

  });

  // var mediumData = [];
  var base = sculpturesInSliderRange.length/500;

  var numberInRange = sculpturesInSliderRange.length

  var materials = [{material: "Gold", count: gold.length/base}, {material: "Wood", count: wood.length/base}, {material: "Marble", count: marble.length/base}, {material: "Stone", count: stone.length/base}, {material: "Terracotta", count: terracotta.length/base}, {material: "Ivory", count: ivory.length/base}, {material: "Bronze", count: bronze.length/base}, {material: "Silver", count: silver.length/base}, {material: "Ceramic", count: ceramic.length/base}, {material: "Alabaster", count: alabaster.length/base}, {material: "Plaster", count: plaster.length/base}];
  console.log("Bar Counts: " + materials);
  console.log("------------------");



  // var mediumObject = {};

  // for (var x=0; x<materials.length; x++) {

  //   mediumObject.medium = materialNames[x];
  //   mediumObject.count = materials[x].length;

  //   console.log(mediumObject);
  //   mediumData.push(mediumObject);

  // }

  console.log("gold: " + parseFloat((gold.length/numberInRange)*100).toFixed(2) +"%");
  console.log("wood: " + parseFloat((wood.length/numberInRange)*100).toFixed(2) +"%");
  console.log("marble: " + parseFloat((marble.length/numberInRange)*100).toFixed(2) +"%");
  console.log("stone: " + parseFloat((stone.length/numberInRange)*100).toFixed(2) +"%");
  console.log("terracotta: " + parseFloat((terracotta.length/numberInRange)*100).toFixed(2) +"%");
  console.log("ivory: " + parseFloat((ivory.length/numberInRange)*100).toFixed(2) +"%");
  console.log("bronze: " + parseFloat((bronze.length/numberInRange)*100).toFixed(2) +"%");
  console.log("silver: " + parseFloat((silver.length/numberInRange)*100).toFixed(2) +"%");
  console.log("ceramic: " + parseFloat((ceramic.length/numberInRange)*100).toFixed(2) +"%");
  console.log("alabaster: " + parseFloat((alabaster.length/numberInRange)*100).toFixed(2) +"%");
  console.log("plaster: " + parseFloat((plaster.length/numberInRange)*100).toFixed(2) +"%");



//legend text -------->

  var legendText = d3.select('div#legend')

  legendText.html("Gold: " + gold.length + "<br/>"
  + "Wood: " + wood.length + "<br/>"
  + "Marble: " + marble.length + "<br/>"
  + "Stone: " + stone.length + "<br/>"
  + "Terracotta: " + terracotta.length + "<br/>"
  + "Ivory: " + ivory.length + "<br/>"
  + "Bronze: " + bronze.length + "<br/>"
  + "Silver: " + silver.length + "<br/>"
  + "Ceramic: " + ceramic.length + "<br/>"
  + "Alabaster: " + alabaster.length + "<br/>"
  + "Plaster: " + plaster.length)


  // // with percents
  //   legendText.html("Gold: " + parseFloat((gold.length/numberInRange)*100).toFixed(2) +"%" + "<br/>"
  // + "Wood: " + parseFloat((wood.length/numberInRange)*100).toFixed(2) +"%" + "<br/>"
  // + "Marble: " + parseFloat((marble.length/numberInRange)*100).toFixed(2) +"%" + "<br/>"
  // + "Stone: " + parseFloat((stone.length/numberInRange)*100).toFixed(2) +"%" + "<br/>"
  // + "Terracotta: " + parseFloat((terracotta.length/numberInRange)*100).toFixed(2) +"%" +"<br/>"
  // + "Ivory: " + parseFloat((ivory.length/numberInRange)*100).toFixed(2) +"%" + "<br/>"
  // + "Bronze: " + parseFloat((bronze.length/numberInRange)*100).toFixed(2) +"%" + "<br/>"
  // + "Silver: " + parseFloat((silver.length/numberInRange)*100).toFixed(2) +"%" + "<br/>"
  // + "Ceramic: " + parseFloat((ceramic.length/numberInRange)*100).toFixed(2) +"%" + "<br/>"
  // + "Alabaster: " + parseFloat((alabaster.length/numberInRange)*100).toFixed(2) +"%" + "<br/>"
  // + "Plaster: " + parseFloat((plaster.length/numberInRange)*100).toFixed(2) +"%")


  // drawBars(materials);

  var barPadding = 16;
  var barWidth = (svgWidth/materials.length);




  var bars = svg.select("g").selectAll("rect")
    .remove()
    .exit()
    .data(materials);

  bars.enter().append("rect")
  .attr("class", "bars")
  .attr("y", function(d) {
      return svgHeight - d.count
  })
  .attr("height", function(d) {
      return d.count;
  })
  .attr("width", barWidth - barPadding)
  .attr("transform", function (d, i) {
      var translate = [50+((barWidth-8)*i), -30];
      return "translate("+ translate +")";
  })
  .attr("fill", function(d, i) {
    var color = colors[i]
    return color
  });


// for pointer on hover
  svg.selectAll("rect")
  .attr("class", "individual-bars");

  var exploreImagesTitle = d3.select("div#explore-images-title")

// on bar click, render images

  var clicked = false;

  //https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
  function compare(a, b){

  let comparison = 0;
  if (a.height > b.height) {
    comparison = 1;
  } else if (b.height > a.height) {
    comparison = -1;
  }
  return comparison;

  }

  //function to render comparison images

  function renderCompareImage(src, height, alt, className, parentQuery) {

          var imgDiv = document.createElement("div")
          imgDiv.className = className

          var img = document.createElement("img");
    			img.src = src;
    			img.style.height = height*5 + "px";
    			img.alt = alt;

    			imgDiv.appendChild(img)

    			var parent = document.querySelector(parentQuery)
    			parent.appendChild(imgDiv)
        }

  //array for comparison selected images
  var arrayForCompare = [];


  svg.select("g").selectAll("rect")
  .on("click", function (d,i) {
    console.log(d);

    var barClicked;

    //for scroll into view
    const element = document.getElementById('legend');


    // render images for each material
    for (var x=0; x<materialNames.length; x++) {
      if (d.material == materialNamesCap[x]) {
        element.scrollIntoView({behavior: "smooth"});

      exploreImagesTitle.html(`<p class="explore-images-title-p">${materialNamesCap[x]} sculptures from your selection</p>`).style("background", colors[x]).style("color", "black")

      removeElementsByClass(".displayed-images")

       var currentImages = [];
      for (var i=0; i<materialArrays[x].length; i++) {
        imageArray.forEach(image => {
          if (materialArrays[x][i]["Object ID"].match(image["Object ID"])) {
            currentImages.push(image)
          }
        });
      }

      currentImages.sort(compare)
      renderEachImage(currentImages, "displayed-images", "#explore-images")
      console.log(currentImages)

      var eachExampleImage = document.querySelectorAll(".displayed-images")

      eachExampleImage.forEach(img => {
        img.addEventListener("mouseover", function(){

          var targetElement = this.parentNode.parentNode

          console.log(this)

          // console.log(targetElement)

          var tooltip = document.createElement("div")

          var currentImageInfo;

          currentImages.forEach(image => {
            if (image.fileName.match(this.src.split("_png/")[1].split(".png")[0])) {
              currentImageInfo = image;
              return currentImageInfo;
            }
          })

          var genderTag;

          if (currentImageInfo.gender == "m") {
            genderTag = "Male"
          } else if (currentImageInfo.gender == "w") {
            genderTag = "Female"
          }

          tooltip.className = "tooltip-test";
          tooltip.innerHTML = `${currentImageInfo["Object Name"]}<br>${currentImageInfo.Culture} | Year ${currentImageInfo["Object End Date"]}<br>${currentImageInfo.height} centimeters<br>Gender: ${genderTag}<br><p class="tooltip-title">Click Sculpture to Add to Selection</p>`;
          // <a href=${currentImageInfo["Link Resource"]}>View on Met Website</a>
          tooltip.style.left = event.clientX - 80 + "px";
          tooltip.style.top = event.clientY + 30 + "px";
          tooltip.style.position = "fixed";

          targetElement.appendChild(tooltip)

        })
      });

      eachExampleImage.forEach(img => {
        img.addEventListener("mouseout", function(){

          var targetElement = this.parentNode.parentNode
          var tooltip = document.querySelector(".tooltip-test")
          targetElement.removeChild(tooltip)

        })
      });

      eachExampleImage.forEach(img => {
        img.addEventListener("click", function(){

        console.log(this.src.split("_png/")[1].split(".png")[0])


        if (arrayForCompare.length <= 2) {

          currentImages.forEach(imgObject => {

          if (imgObject.fileName.match(this.src.split("_png/")[1].split(".png")[0])) {
            console.log("matched")
            arrayForCompare.push(imgObject)
          } else {
            console.log("not-matched")
          }
        })

        removeElementsByClass(".compare-message-p")
        removeElementsByClass(".selected-sculpture-parent-div")
        renderEachImage(arrayForCompare, "selected-sculpture", ".sidebar-contents", "selected-sculpture-parent-div")

        removeElementsByClass(".compare-height-images")
        for(var i = 0; i<arrayForCompare.length; i++) {
          console.log("comparison obejct: " + parseInt(arrayForCompare[i].height))
          renderCompareImage(`resized_clipped_tranparent_png/${arrayForCompare[i].fileName.split('.')[0]}.png`, parseInt(arrayForCompare[i].height), [i], "compare-height-images", ".compare-image-container")
        }

        //add "change selection" button to compare section
        removeElementsByClass(".change-selection-a")

        var changeSelectionButton = document.createElement("a")
        changeSelectionButton.className = "change-selection-a"
        changeSelectionButton.href = "#legend"
        changeSelectionButton.innerHTML = "Change sculpture selection"


        var changeSelectionDiv = document.querySelector(".change-selection")

        changeSelectionDiv.appendChild(changeSelectionButton)


         var removalIcons = document.querySelectorAll(".remove-icon")

        removalIcons.forEach(icon => {
        icon.addEventListener("click", function () {
          // console.log(this)
          var index = this.parentNode.querySelector("img").alt
          console.log("index: " + index)

          this.parentNode.remove();

          arrayForCompare.splice(index, 1)

          if (arrayForCompare.length <3) {
          removeElementsByClass(".compare-selection-anchor")
        }


          })
       });


        } else {

          console.log("your selection is full, please remove a sculpture before adding to your selection")
        }

        console.log(arrayForCompare)

        if (arrayForCompare.length >= 3) {

          removeElementsByClass(".compare-selection-anchor")

          var compareAnchorDiv = document.querySelector(".compare-anchor-div")

          var compareAnchor = document.createElement("a")
          compareAnchor.href = "#learn-more"
          compareAnchor.className = "compare-selection-anchor"

          var compareImage = document.createElement("img")

          compareImage.src = "compare.png"
          compareImage.className = "compare-img"

          compareAnchor.appendChild(compareImage)

          compareAnchorDiv.appendChild(compareAnchor)

        }



        })
      })



      barClicked = x;
      clicked = true;

      }
    }



    // if (d.material == "Gold") {
    //   // window.location = '#legend';
    //   element.scrollIntoView({behavior: "smooth"});

    //   exploreImagesTitle.html(`<p class="explore-images-title-p">Gold sculptures from your selection</p>`).style("background", colors[0]).style("color", "peru")
    //   if (barClicked != 0 && clicked == true) {
    //     removeElementsByClass(".displayed-images")
    //   }

    //   var currentImages = [];
    //   for (var i=0; i<gold.length; i++) {
    //     imageArray.forEach(image => {
    //       if (gold[i]["Object ID"].match(image["Object ID"])) {
    //         currentImages.push(image)
    //       }
    //     });
    //   }

    //   currentImages.sort(compare)
    //   renderEachImage(currentImages)
    //   console.log(currentImages)

    //   var eachExampleImage = document.querySelectorAll(".displayed-images")


    //   eachExampleImage.forEach(img => {
    //     img.addEventListener("click", testFunction(currentImages))
    //   })

    //   barClicked = 0;
    //   clicked = true;
    // } else if (d.material == "Wood") {

    //   element.scrollIntoView({behavior: "smooth"});

    //   exploreImagesTitle.html(`<p class="explore-images-title-p">Wood sculptures from your selection</p>`).style("background", colors[1]).style("color", "white")
    //   if (barClicked != 1 && clicked == true) {
    //     removeElementsByClass(".displayed-images")
    //   }

    //   var currentImages = [];
    //   for (var i=0; i<wood.length; i++) {
    //     imageArray.forEach(image => {
    //       if (wood[i]["Object ID"].match(image["Object ID"])) {
    //         currentImages.push(image)
    //         // createImagesD3(currentImages)
    //       }
    //     });
    //   }

    //   currentImages.sort(compare)
    //   renderEachImage(currentImages)
    //   console.log(currentImages)

    //   barClicked = 1;
    //   clicked = true;
    // } else if (d.material == "Marble") {

    //   element.scrollIntoView({behavior: "smooth"});

    //   exploreImagesTitle.html(`<p class="explore-images-title-p">Marble sculptures from your selection</p>`).style("background", colors[2]).style("color", "peru")
    //   if (barClicked != 2 && clicked == true) {
    //     removeElementsByClass(".displayed-images")
    //   }

    //   var currentImages = [];
    //   for (var i=0; i<marble.length; i++) {
    //     imageArray.forEach(image => {
    //       if (marble[i]["Object ID"].match(image["Object ID"])) {
    //         currentImages.push(image)
    //         // createImagesD3(currentImages)
    //       }
    //     });
    //   }

    //   currentImages.sort(compare)
    //   renderEachImage(currentImages)
    //   console.log(currentImages)

    //   barClicked = 2;
    //   clicked = true;
    // } else if (d.material == "Stone") {

    //   element.scrollIntoView({behavior: "smooth"});

    //   exploreImagesTitle.html(`<p class="explore-images-title-p">Stone sculptures from your selection</p>`).style("background", colors[3]).style("color", "white")
    //   if (barClicked != 3 && clicked == true) {
    //     removeElementsByClass(".displayed-images")
    //   }

    //   var currentImages = [];
    //   for (var i=0; i<stone.length; i++) {
    //     imageArray.forEach(image => {
    //       if (stone[i]["Object ID"].match(image["Object ID"])) {
    //         currentImages.push(image)
    //         // createImagesD3(currentImages)
    //       }
    //     });
    //   }

    //   currentImages.sort(compare)
    //   renderEachImage(currentImages)
    //   console.log(currentImages)

    //   barClicked = 3;
    //   clicked = true;
    // } else if (d.material == "Terracotta") {

    //   element.scrollIntoView({behavior: "smooth"});

    //   exploreImagesTitle.html(`<p class="explore-images-title-p">Terracotta sculptures from your selection</p>`).style("background", colors[4]).style("color", "white")
    //   if (barClicked != 4 && clicked == true) {
    //     removeElementsByClass(".displayed-images")
    //   }

    //   var currentImages = [];
    //   for (var i=0; i<terracotta.length; i++) {
    //     imageArray.forEach(image => {
    //       if (terracotta[i]["Object ID"].match(image["Object ID"])) {
    //         currentImages.push(image)
    //       }
    //     });
    //   }

    //   currentImages.sort(compare)
    //   renderEachImage(currentImages)
    //   console.log(currentImages)

    //   barClicked = 4;
    //   clicked = true;
    // } else if (d.material == "Ivory") {

    //   element.scrollIntoView({behavior: "smooth"});

    //   exploreImagesTitle.html(`<p class="explore-images-title-p">Ivory sculptures from your selection</p>`).style("background", colors[5]).style("color", "peru")
    //   if (barClicked != 5 && clicked == true) {
    //     removeElementsByClass(".displayed-images")
    //   }

    //   var currentImages = [];
    //   for (var i=0; i<ivory.length; i++) {
    //     imageArray.forEach(image => {
    //       if (ivory[i]["Object ID"].match(image["Object ID"])) {
    //         currentImages.push(image)
    //       }
    //     });
    //   }

    //   currentImages.sort(compare)
    //   renderEachImage(currentImages)
    //   console.log(currentImages)

    //   barClicked = 5;
    //   clicked = true;
    // } else if (d.material == "Bronze") {

    //   element.scrollIntoView({behavior: "smooth"});

    //   exploreImagesTitle.html(`<p class="explore-images-title-p">Bronze sculptures from your selection</p>`).style("background", colors[6]).style("color", "white")
    //   if (barClicked != 6 && clicked == true) {
    //     removeElementsByClass(".displayed-images")
    //   }

    //   var currentImages = [];
    //   for (var i=0; i<bronze.length; i++) {
    //     imageArray.forEach(image => {
    //       if (bronze[i]["Object ID"].match(image["Object ID"])) {
    //         currentImages.push(image)
    //       }
    //     });
    //   }

    //   currentImages.sort(compare)
    //   renderEachImage(currentImages)
    //   console.log(currentImages)

    //   barClicked = 6;
    //   clicked = true;
    // } else if (d.material == "Silver") {

    //   element.scrollIntoView({behavior: "smooth"});

    //   exploreImagesTitle.html(`<p class="explore-images-title-p">Silver sculptures from your selection</p>`).style("background", colors[7]).style("color", "peru")
    //   if (barClicked != 7 && clicked == true) {
    //     removeElementsByClass(".displayed-images")
    //   }

    //   var currentImages = [];
    //   for (var i=0; i<silver.length; i++) {
    //     imageArray.forEach(image => {
    //       if (silver[i]["Object ID"].match(image["Object ID"])) {
    //         currentImages.push(image)
    //       }
    //     });
    //   }

    //   currentImages.sort(compare)
    //   renderEachImage(currentImages)
    //   console.log(currentImages)

    //   barClicked = 7;
    //   clicked = true;
    // } else if (d.material == "Ceramic") {

    //   element.scrollIntoView({behavior: "smooth"});

    //   exploreImagesTitle.html(`<p class="explore-images-title-p">Ceramic sculptures from your selection</p>`).style("background", colors[8]).style("color", "peru")
    //   if (barClicked != 8 && clicked == true) {
    //     removeElementsByClass(".displayed-images")
    //   }

    //   var currentImages = [];
    //   for (var i=0; i<ceramic.length; i++) {
    //     imageArray.forEach(image => {
    //       if (ceramic[i]["Object ID"].match(image["Object ID"])) {
    //         currentImages.push(image)
    //       }
    //     });
    //   }

    //   currentImages.sort(compare)
    //   renderEachImage(currentImages)
    //   console.log(currentImages)

    //   barClicked = 8;
    //   clicked = true;
    // } else if (d.material == "Alabaster") {

    //   element.scrollIntoView({behavior: "smooth"});

    //   exploreImagesTitle.html(`<p class="explore-images-title-p">Alabaster sculptures from your selection</p>`).style("background", colors[9]).style("color", "peru")
    //   if (barClicked != 9 && clicked == true) {
    //     removeElementsByClass(".displayed-images")
    //   }

    //   var currentImages = [];
    //   for (var i=0; i<alabaster.length; i++) {
    //     imageArray.forEach(image => {
    //       if (alabaster[i]["Object ID"].match(image["Object ID"])) {
    //         currentImages.push(image)
    //       }
    //     });
    //   }

    //   currentImages.sort(compare)
    //   renderEachImage(currentImages)
    //   console.log(currentImages)

    //   barClicked = 9;
    //   clicked = true;
    // } else if (d.material == "Plaster") {

    //   element.scrollIntoView({behavior: "smooth"});

    //   exploreImagesTitle.html(`<p class="explore-images-title-p">Plaster sculptures from your selection</p>`).style("background", colors[10]).style("color", "peru")
    //   if (barClicked != 10 && clicked == true) {
    //     removeElementsByClass(".displayed-images")
    //   }

    //   var currentImages = [];
    //   for (var i=0; i<plaster.length; i++) {
    //     imageArray.forEach(image => {
    //       if (plaster[i]["Object ID"].match(image["Object ID"])) {
    //         currentImages.push(image)
    //       }
    //     });
    //   }

    //   currentImages.sort(compare)
    //   renderEachImage(currentImages)
    //   console.log(currentImages)

    //   barClicked = 10;
    //   clicked=true;
    // }

    // HERE!


  // var imageHolder = document.getElementById("explore-images")

  // imageHolder.selectAll("img").addEventListener("click", testFunction)

  // for (element of eachExampleImage) {

  //   element.addEventListener("click", testFunction)
  // }

// function testFunction() {
//       console.log('test for tooltip')
//     };


  // var testLog = console.log('test for tooltip')

  // eachExampleImage.forEach(div => {
  //   div.selectAll("img").addEventListener("click", function () {
  //     console.log('test for tooltip')
  //   });
  // });


  // eachExampleImage.selectAll("img")
    // if (d.material == "Gold") {
    //   exploreImages.append("rect").attr("height", 50).attr("width", 50).attr("x", 0).attr("y",0).attr("class", "rectangle").attr("fill", colors[i]);
    // } else if (d.material == "Wood") {
    //   exploreImages.append("rect").attr("height", 50).attr("width", 50).attr("x", 0).attr("y",0).attr("class", "rectangle").attr("fill", colors[i]);
    // } else if (d.material == "Marble") {
    //   exploreImages.append("rect").attr("height", 50).attr("width", 50).attr("x", 0).attr("y",0).attr("class", "rectangle").attr("fill", colors[i]);
    // } else if (d.material == "Stone") {
    //   exploreImages.append("rect").attr("height", 50).attr("width", 50).attr("x", 0).attr("y",0).attr("class", "rectangle").attr("fill", colors[i]);
    // } else if (d.material == "Terracotta") {
    //   exploreImages.append("rect").attr("height", 50).attr("width", 50).attr("x", 0).attr("y",0).attr("class", "rectangle").attr("fill", colors[i]);
    // } else if (d.material == "Ivory") {
    //   exploreImages.append("rect").attr("height", 50).attr("width", 50).attr("x", 0).attr("y",0).attr("class", "rectangle").attr("fill", colors[i]);
    // } else if (d.material == "Bronze") {
    //   exploreImages.append("rect").attr("height", 50).attr("width", 50).attr("x", 0).attr("y",0).attr("class", "rectangle").attr("fill", colors[i]);
    // } else if (d.material == "Silver") {
    //   exploreImages.append("rect").attr("height", 50).attr("width", 50).attr("x", 0).attr("y",0).attr("class", "rectangle").attr("fill", colors[i]);
    // } else if (d.material == "Ceramic") {
    //   exploreImages.append("rect").attr("height", 50).attr("width", 50).attr("x", 0).attr("y",0).attr("class", "rectangle").attr("fill", colors[i]);
    // } else if (d.material == "Alabaster") {
    //   exploreImages.append("rect").attr("height", 50).attr("width", 50).attr("x", 0).attr("y",0).attr("class", "rectangle").attr("fill", colors[i]);
    // } else if (d.material == "Plaster") {
    //   exploreImages.append("rect").attr("height", 50).attr("width", 50).attr("x", 0).attr("y",0).attr("class", "rectangle").attr("fill", colors[i]);
    // }

  });



  // -----------------------
  sculptureArray = sculpturesInSliderRange;
  materialArray = materials;
  goldArray = gold;
  woodArray = wood;
  marbleArray = marble;
  stoneArray = stone;
  terracottaArray = terracotta;
  ivoryArray = ivory;
  bronzeArray = bronze;
  silverArray = silver;
  ceramicArray = ceramic;
  alabasterArray = alabaster;
  plasterArray = plaster;
  return sculptureArray, materialArray, goldArray, woodArray, marbleArray, stoneArray, terracottaArray, ivoryArray, bronzeArray, silverArray, ceramicArray, alabasterArray, plasterArray;

});

console.log(sculptureArray);


// mouse click event for each bar

// barClick();





  // console.log("gold: " + gold.length);
  // console.log("wood: " + wood.length);
  // console.log("marble: " + marble.length);
  // console.log("stone: " + stone.length);
  // console.log("terracotta: " + terracotta.length);
  // console.log("ivory: " + ivory.length);
  // console.log("bronze: " + bronze.length);
  // console.log("silver: " + silver.length);
  // console.log("ceramic: " + ceramic.length);
  // console.log("alabaster: " + alabaster.length);
  // console.log("plaster: " + plaster.length);

});


function mediumArray(object, arrayName, matchLC, matchCaps) {
  if (object.Medium.match(matchCaps) || object.Medium.match(matchLC)) {
      arrayName.push(object);
    }
}




// // previous qualitative project

// d3.json(
//   "finalClippedFileAndHeight.json"
// ).then(sculptures => {


// // narrow down this to only sculptures that were clipped - figure out why this # is 1736, but there are only 1607 clipped images?
// let clippedSculptures = []


// for (var i=0; i<sculptures.length; i++) {
// if (sculptures[i].boundingRectHeightRatio){
//   sculptures[i].fileNamePNG = sculptures[i].fileName.split('.')[0] + '.png'
//   clippedSculptures.push(sculptures[i]);
// }
// }


// console.log(clippedSculptures.length);

// // create variables to hold sculptures of different sizes
// let extraSmallSculptures = [];
// let smallSculptures = [];
// let mediumSculptures = [];
// let largeSculptures = [];
// let extraLargeSculptures = [];

// // loop through sculpture objects and categorize (add group to clipped sculptures objects, and also push to array for each category)
// clippedSculptures.forEach(sculpture => {
// if (sculpture.height <= 10) {
//   sculpture.group = "extraSmall";
//   extraSmallSculptures.push(sculpture);
// } else if (sculpture.height > 10 && sculpture.height <= 50) {
//   sculpture.group = "small"
//   smallSculptures.push(sculpture);
// } else if (sculpture.height > 50 && sculpture.height <= 100) {
//   sculpture.group = "medium";
//   mediumSculptures.push(sculpture);
// } else if (sculpture.height > 100 && sculpture.height <=200) {
//   sculpture.group = "large";
//   largeSculptures.push(sculpture);
// } else {
//   sculpture.group = "extraLarge";
//   extraLargeSculptures.push(sculpture);
// }
// });

// console.log("*****");
// console.log(extraSmallSculptures.length);
// console.log("*****");
// console.log(smallSculptures.length);
// console.log("*****");
// console.log(mediumSculptures.length);
// console.log("*****");
// console.log(largeSculptures.length);
// console.log("*****");
// console.log(extraLargeSculptures.length);

// /* Console.log results ---->
// 1736
// *****
// 293
// *****
// 950
// *****
// 345
// *****
// 125
// *****
// 23
// ------> */






// // var myImage = document.getElementById("mainImage");
// // scaled images
// let mainSmall = document.querySelector(".mainSmallImage");
// console.log(mainSmall);

// let myImageMedium = document.querySelector(".mainMediumImage");
// console.log(myImageMedium);

// let myImageLarge = document.querySelector(".mainLargeImage");
// console.log(myImageLarge);


// // overview images without scale
// let overviewSmall = document.querySelector(".overviewSmallImage");
// console.log(overviewSmall);

// let overviewMedium = document.querySelector(".overviewMediumImage");
// console.log(overviewMedium);

// let overviewLarge = document.querySelector(".overviewLargeImage");
// console.log(overviewLarge);


// let imageIndex = 1;
// let baseHeight = 3;
// let overviewWidth = '180px'

// var odW = '20%'
// var odH = '90%'

// // sculpture descriptions
// var smallOverviewDescription = d3.select('.sculptureDescriptionSmall')
// .append('smallOverviewDescription')
//   .attr('width', odW)
//   .attr('height', odH)
//   .append('g');

// var mediumOverviewDescription = d3.select('.sculptureDescriptionMed')
// .append('mediumOverviewDescription')
//   .attr('width', odW)
//   .attr('height', odH)
//   .append('g');

// var largeOverviewDescription = d3.select('.sculptureDescriptionLarge')
// .append('largeOverviewDescription')
//   .attr('width', odW)
//   .attr('height', odH)
//   .append('g');

// function changeSmall(){
// imageIndex++;

// mainSmall.setAttribute("src", "resized_clipped_tranparent_png/" + smallSculptures[imageIndex].fileNamePNG);
// overviewSmall.setAttribute("src", "resized_clipped_tranparent_png/" + smallSculptures[imageIndex].fileNamePNG);

// mainSmall.style.height = baseHeight * smallSculptures[imageIndex].height + 'px';
// // mainSmall.style.height = baseHeight * smallSculptures[imageIndex].height + '%'; //safari
// overviewSmall.style.maxWidth = overviewWidth;
// overviewSmall.style.height = 'auto';

// smallOverviewDescription
// .html(`<b>${smallSculptures[imageIndex].Title}</b> (${smallSculptures[imageIndex].endDate})<br/><br/><b>${smallSculptures[imageIndex].height} cm | ${(smallSculptures[imageIndex].height * 0.393701).toFixed(2)} inches</b><br/><br/>${smallSculptures[imageIndex].Medium}<br/><br/>${smallSculptures[imageIndex].Culture}`)
// .attr('class', 'sculptureDescriptionSmall');
// // .style('float', 'left')
// // .style('margin-left', '5%')
// // .style('margin-top', '90%');


// if (imageIndex > smallSculptures.length) {
//   imageIndex = 0;
// }
// }

// window.changeSmall = changeSmall;


// function changeMedium(){

// imageIndex++;

// myImageMedium.setAttribute("src", "resized_clipped_tranparent_png/" + mediumSculptures[imageIndex].fileNamePNG);
// overviewMedium.setAttribute("src", "resized_clipped_tranparent_png/" + mediumSculptures[imageIndex].fileNamePNG);


// myImageMedium.style.height = baseHeight *mediumSculptures[imageIndex].height + 'px';
// // myImageMedium.style.height = baseHeight *mediumSculptures[imageIndex].height + '%'; //safari
// overviewMedium.style.maxWidth = overviewWidth;
// overviewMedium.style.height = 'auto';


// mediumOverviewDescription
// .html(`<b>${mediumSculptures[imageIndex].Title}</b> (${mediumSculptures[imageIndex].endDate})<br/><br/><b>${mediumSculptures[imageIndex].height} cm | ${(mediumSculptures[imageIndex].height * 0.0328084).toFixed(2)} feet</b><br/><br/>${mediumSculptures[imageIndex].Medium}<br/><br/>${mediumSculptures[imageIndex].Culture}`)
// .attr('class', 'sculptureDescriptionMed');
// // .style('left', '35%')
// // .style('top', '90%');

// if (imageIndex > mediumSculptures.length) {
//   imageIndex = 0;
// }
// }

// window.changeMedium = changeMedium;

// function changeLarge(){

// imageIndex++;

// myImageLarge.setAttribute("src", "resized_clipped_tranparent_png/" + largeSculptures[imageIndex].fileNamePNG);
// overviewLarge.setAttribute("src", "resized_clipped_tranparent_png/" + largeSculptures[imageIndex].fileNamePNG);


// console.log(largeSculptures[imageIndex].height)
// myImageLarge.style.height = baseHeight * largeSculptures[imageIndex].height + 'px';
// // myImageLarge.style.height = baseHeight * largeSculptures[imageIndex].height + '%'; //works as % in safari, not chrome
// overviewLarge.style.maxWidth = overviewWidth;
// overviewLarge.style.height = 'auto';

// largeOverviewDescription
// .html(`<b>${largeSculptures[imageIndex].Title}</b> (${largeSculptures[imageIndex].endDate})<br/><br/><b>${largeSculptures[imageIndex].height} cm | ${(largeSculptures[imageIndex].height * 0.0328084).toFixed(1)} feet</b><br/><br/>${largeSculptures[imageIndex].Medium}<br/><br/>${largeSculptures[imageIndex].Culture}`)
// .attr('class', 'sculptureDescriptionLarge');
// // .style('left', '50%')
// // .style('top', '90%');

// if (imageIndex > largeSculptures.length) {
//   imageIndex = 0;
// }
// }

// window.changeLarge = changeLarge;


// changeSmall();
// changeMedium();
// changeLarge();

// // user height
// // let userFeet = document.querySelector("#feet");
// // let userInches = document.querySelector("#inches");

// // let userHeight = (userFeet * 30.48) + (userInches * 2.54)

// // console.log(userHeight);


// });
