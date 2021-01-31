import React, { Component } from "react";
import { Radar } from "react-chartjs-2";

function RadarGraph() {
  return (
    <div>
      <Radar
        height={300}
        width={50}
        options={{ maintainAspectRatio: false }}
        // type= 'horizontalBar'
        data={{
          labels: ["Games Played", "Points", "Rebounds", "Assists"],

          datasets: [
            {
              label: 'First player',
              backgroundColor: 'red', //color of dots
              borderColor: 'red',
              data: [20,40,5,10], //data of line
              fill: true,
            },
            {
                label: 'Second player',
                backgroundColor: 'blue', //color of dots
                borderColor: 'blue',
                data: [70,10,45,50], //data of line
                fill: true,
              },
          ],
        }}
      />
    </div>
  );
}

export default RadarGraph;
