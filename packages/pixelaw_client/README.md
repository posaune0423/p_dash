# Why this
I needed a blank canvas (hihi) to fully understand all the elements.
It turned out in rearchitecting everything from the ground up, mostly to be able to add bitmap tiles.

# What's new
- Separated the rendering (viewport) from the data (pixels and bitmap tiles)
- Pixels can now be show based on bitmap tile data from the server's "TileCacher" module
- Introduced "wrapping" around the unsigned int32 coordinate system. 
  - So to the left of x=0 is now x=4_294_967_295 but it all "just works"

# How to run it
- It's a regular Vite+React project, but you'll need the PixeLAW Core (dev)container running somewhere too.

