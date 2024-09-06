attribute vec2 aPosition;
attribute vec4 aColor;
uniform vec2 uResolution;
uniform vec2 uOffset;
uniform float uScale;

varying vec4 vColor;

void main() {
    vec2 scaledPosition = (aPosition - uOffset) * uScale;
    vec2 clipSpace = (scaledPosition / uResolution) * 2.0 - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    vColor = aColor;
}