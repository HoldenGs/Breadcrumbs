import React from 'react'
import ReactSlider from 'react-slider'


// Using https://zillow.github.io/react-slider/ for this slider
export default function Slider() {
  return (
    <div>
    <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        markClassName="example-mark"
        marks
        min={1}
        max={10}
        renderTrack={(props, state) => <div {...props} />}
    />
    </div>
  )
}
