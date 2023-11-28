const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// d3.json(url).then(function(data){
//     console.log(data);
// });
///initialiaze dashboard
function init() {
    //use D3 to select dropdown
    let dropdownMenu = d3.select("#selDataset");
    //use d3 to get sample
    d3.json(url).then((data) => {
        //set a variable
        let names = data.names ;
        //add samples
        names.forEach((id) => {
            ///log the value
            console.log(id);
            dropdownMenu.append("option")
            .text(id)
            .property("value",id);

        });
        //set first sample
        let sample_one = names[0];
        ///log the sample
        console.log(sample_one);

        //buyild plot
        BuildMetadata(sample_one);
        buildBarChart(sample_one);
        buildBubbleChart(sample_one);
        // buildguagechart(sample_one); 
    });
    };

    //function populates
    function BuildMetadata(sample){
        //use d3 to retrieve
        d3.json(url).then((data) =>{
            //retrieve all metdata
            let metadata = data.metadata;
            //filter sample
            let value = metadata.filter(result =>result.id == sample);
            //log teh array
            console.log(value)

            //get the first index
            let valueData = value[0];

            //clear out metdata
            d3.select("#sample-metadata").html("");
            //use objects
            Object.entries(valueData).forEach(([key,value]) => {
                ///log the individual key
                console.log(key,value);
                d3.select("#sample-metadata").append("h5").text(`${key}:${value}`);

            });
            });
        }
            //function that bulds chart
            function buildBarChart(sample) {
                //retrieve
                d3.json(url).then((data) => {

                    //retrieve all data
                    let sampleinfo = data.samples;
                    //filtr sample
                    let value = sampleinfo.filter(result =>result.id == sample);
                    //get the first index
                    let valueData = value[0];

                    //Get the otu
                    let otu_ids = valueData.otu_ids;
                    let otu_labels = valueData.otu_labels;
                    let sample_values = valueData.sample_values;
                    //log data to console
                    console.log(otu_ids,otu_labels,sample_values);

                    //set top tem items to display
                    let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
                    let xticks = sample_values.slice(0,10).reverse();
                    let labels = otu_labels.slice(0,10).reverse();

                    //setup traces
                    let trace = {
                        x:xticks,
                        y:yticks,
                        text:labels,
                        type:"bar",
                        orientation:"h"
                    };

                    //setup layout
                    let layout = {
                        title:"Top 10 OTU'S Present"

                    };
                    //call plotly
                    Plotly.newPlot("bar",[trace],layout)
                });
                };
                ///functions tha buildup bubb;le chart
                function buildBubbleChart(sample){

                    //use d3 to retrieve
                    d3.json(url).then((data) =>{
                        ///Retrieve all sample data
                        let sampleInfo = data.samples;
                        //filter based on the sample
                        //let value = sampleInfo = data.samples;
                        //filter based on value
                        let value = sampleInfo.filter(result => result.id ==sample);
                        //get tjhe first index
                        let valueData = value[0];

                        //get otu id,label,sample vbalues
                        let otu_ids = valueData.otu_ids;
                        let otu_labels = valueData.otu_labels;
                        let sample_values = valueData.sample_values;
                
                        // Log the data to the console
                        console.log(otu_ids,otu_labels,sample_values);
                    //setup the trace for bubble
                    let trace1 = {
                        x:otu_ids,
                        y:sample_values,
                        text:otu_labels,
                        mode:"markers",
                        marker:{
                            size:sample_values,
                            color:otu_ids,
                            colorscale:"Earth"
                        
                        }
                    };
                    //setup layout
                    let layout = {
                        title:"Bacteria Per Sample",
                        hovermode: "closest",
                        xaxis: {title: "OTU ID"},
                    };
                    //call plotly
                    Plotly.newPlot("bubble",[trace1],layout)
                });
            };
            ///function that updates
            function optionChanged(value){
                //log the new value
                console.log(value);
                //call all function
                BuildMetadata(value);
                buildBarChart(value);
                buildBubbleChart(value);
                // buildguagechart(value); 

            };
            //call initiaze
            init();
            
                    
                
        