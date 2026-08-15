/**
 * Screenshots are captured at the width of the app, but the article column is
 * ~820px here and ~680px in Help Scout, so a full-width capture lands at well
 * under half its real size and the UI text becomes unreadable.
 *
 * Help Scout articles wrap each image in a link to the full-size asset. This
 * does the same on the staging site so the preview behaves like the published
 * article rather than looking better or worse than what readers get.
 */
function wrapScreenshots() {
  const images = document.querySelectorAll(
    '.markdown img:not([data-linked])',
  );

  images.forEach((img) => {
    img.setAttribute('data-linked', 'true');

    // Leave anything an author already linked alone.
    if (img.closest('a')) return;

    const link = document.createElement('a');
    link.href = img.currentSrc || img.src;
    link.target = '_blank';
    link.rel = 'noopener';
    link.className = 'screenshot-link';
    link.title = 'Open this screenshot at full size';

    img.parentNode.insertBefore(link, img);
    link.appendChild(img);
  });
}

export function onRouteDidUpdate() {
  // Images mount after the route settles, so run once now and once on the next
  // frame to catch anything still rendering.
  wrapScreenshots();
  requestAnimationFrame(wrapScreenshots);
}
