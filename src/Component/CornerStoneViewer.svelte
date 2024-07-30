<script>
    import { onMount } from 'svelte';
  
    let content;
    let viewportType;
  
    onMount(async () => {
      if (typeof window !== 'undefined') {
        try {
          // Import the helper functions for rendering engine setup
          const { setupRenderingEngine, getViewportType } = await import('../Component2/renderingEngineSetup.js');
          const { createImageIdsAndCacheMetaData } = await import('../Component2/helper.js');
          const { initDemo } = await import('../Component2/initDemo.js');
          
          // Initialize Cornerstone
          await initDemo();
          
          // Get the viewport type
          viewportType = getViewportType();
         
          // Fetch image IDs
          const imageIds = await createImageIdsAndCacheMetaData({
            StudyInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
            SeriesInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
            wadoRsRoot: 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb',
          });
          
          console.log(imageIds);
  
          // Create and configure the element
          const element = document.createElement('div');
          element.style.width = '500px';
          element.style.height = '300px';
          content.appendChild(element);
  
          // Setup the rendering engine
          const renderingEngine = setupRenderingEngine('myRenderingEngine', element, 'CT_AXIAL_STACK', viewportType);
  
          const viewport = renderingEngine.getViewport('CT_AXIAL_STACK');
  
          // Set the stack and render the viewport
          viewport.setStack(imageIds, 60);
          viewport.render();
        } catch (error) {
          console.error('Error setting up Cornerstone:', error);
        }
      }
    });
  </script>
  
  <style>
    #content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100vh;
    }
  </style>
  
  <div id="content" bind:this={content}></div>
  