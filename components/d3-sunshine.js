const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const d3scale = require('d3-scale-chromatic');

const margin = { top: 20, right: 20, bottom: 30, left: 30 };
const height = 600;


class D3Sunshine extends D3Component {
  initialize(node, props) {
        const svg = (this.svg = d3.select(node).append('svg'));

        const colors = ["#9ec8ff", "#ffa09b"]

        x = d3.scaleTime()
            .domain(d3.extent(data, d => d.Month))
            .range([margin.left, width - margin.right])

        xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x)
            .ticks(width / 80)
            .tickSizeOuter(0))
            .call(g => g.select(".domain").remove())

        y = d3.scaleLinear()
            .domain([
                d3.min(data, d => Math.min(d.Comics, d.Manga)),
                d3.max(data, d => Math.max(d.Comics, d.Manga))
            ]).nice(5)
            .range([height - margin.bottom, margin.top])

        yAxis = g => g.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y))
                .call(g => g.select(".domain").remove())
                .call(g => g.select(".tick:last-of-type text").clone()
                    .attr("x", 3)
                    .attr("text-anchor", "start")
                    .attr("font-weight", "bold"))


        node = chart()
  }

  chart() {
          const aboveUid = DOM.uid("above");
          const belowUid = DOM.uid("below");

          const svg = d3.create("svg")
              .attr("viewBox", [0, 0, width, height])
              .datum(data);

          svg.append("g")
              .call(xAxis);

          svg.append("g")
              .call(yAxis);

          svg.append("clipPath")
              .attr("id", aboveUid.id)
            .append("path")
              .attr("d", d3.area()
                  .curve(curve)
                  .x(d => x(d.Month))
                  .y0(0)
                  .y1(d => y(d.Comics)));

          svg.append("clipPath")
              .attr("id", belowUid.id)
            .append("path")
              .attr("d", d3.area()
                  .curve(curve)
                  .x(d => x(d.Month))
                  .y0(height)
                  .y1(d => y(d.Comics)));

          svg.append("path")
              .attr("clip-path", aboveUid)
              .attr("fill", colors[1])
              .attr("d", d3.area()
                  .curve(curve)
                  .x(d => x(d.Month))
                  .y0(height)
                  .y1(d => y(d.Manga)));

          svg.append("path")
              .attr("clip-path", belowUid)
              .attr("fill", colors[0])
              .attr("d", d3.area()
                  .curve(curve)
                  .x(d => x(d.Month))
                  .y0(0)
                  .y1(d => y(d.Manga)));

          svg.append("path")
              .attr("fill", "none")
              .attr("stroke", "black")
              .attr("stroke-width", 1.5)
              .attr("stroke-linejoin", "round")
              .attr("stroke-linecap", "round")
              .attr("d", d3.line()
                  .curve(curve)
                  .x(d => x(d.Month))
                  .y(d => y(d.Manga)));

          return svg.node();
  }

  const data = {
          const parseDate = d3.utcParse("%Y-%m");
          const data = d3.csvParse(props.data).text(), d => ({
            Month: parseDate(d.Month),
            Comics: +d["Comics"], // The primary value.
            Manga: +d["Manga"] // The secondary comparison value.
          }));
          return data;
  }

  update(props, oldProps) {
    // Use this function to update the visualization.
    // The initial SVG element can be accessed with: this.svg

    // this.svg.selectAll('line')
    //   .transition()
    //   .duration(750)
    //   .attr('color', '#ccc');
  }
}

module.exports = D3Sunshine;