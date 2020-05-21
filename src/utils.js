  export const calcGridSize = (containerSelector, cardSelector) => {

      /**
       * Calculate the masonry
       *
       * Calculate the average of heights of masonry-bricks and then
       * set it as the height of the masonry element.
       *
       * @since 12212018
       * @author Rahul Arora
       * @param grid       Object  The Masonry Element 
       * @param gridCell   Object  The Masonry bricks
       * @param gridGutter Integer The Vertical Space between bricks 
       * @param bigGridCol   Integer Number of columns on big screens
       * @param medGridCol   Integer Number of columns on medium-sized screens
       * @param sGridCol   Integer Number of columns on small screens
       */
      const bigGridCol = 3;
      const medGridCol = 2;
      const sGridCol = 1;
      const gridGutter = 8;
      var g = document.querySelector(containerSelector),
          gc = document.querySelectorAll(cardSelector),
          gcLength = gc.length, // Total number of cells in the masonry
          gHeight = 0, // Initial height of our masonry
          i; // Loop counter
      // Calculate the net height of all the cells in the masonry
      let defaultHeight = 690;
      for (i = 0; i < gcLength; ++i) {
          let newHeight = gc[i].offsetHeight > defaultHeight ? gc[i].offsetHeight : defaultHeight;
          gHeight += gc[i].offsetHeight + parseInt(gridGutter);
      }
      /*
       * Calculate and set the masonry height based on the columns
       * provided for big, medium, and small screen devices.
       */
      let newHeight = gHeight;
      const windowWidth = window.innerWidth;
      const largeBreakpoint = 1411;
      const medBreakpoint = 800;
      if (windowWidth >= largeBreakpoint) {
          //large
        //   console.log(gHeight / bigGridCol, gHeight / (gcLength + 1))
          newHeight = gHeight / bigGridCol + gHeight / (gcLength + 1);
      } else if (windowWidth < largeBreakpoint && windowWidth >= medBreakpoint) {
          newHeight = gHeight / medGridCol + gHeight / (gcLength + 1);
      } else {
          newHeight = gHeight / sGridCol + gHeight / (gcLength + 1);
      }

      g.style.height = newHeight + 'px';
  }