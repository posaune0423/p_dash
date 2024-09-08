precision mediump float;
uniform sampler2D uTexture;
varying vec2 vTextCoord;

void main() {
  gl_FragColor = texture2D(uTexture, vTextCoord);
}