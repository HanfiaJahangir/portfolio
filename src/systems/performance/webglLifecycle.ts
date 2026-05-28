import type { RootState } from "@react-three/fiber";

export function prepareWebGLContext({ gl }: RootState) {
  gl.setClearColor("#05070d", 1);
}

export function releaseWebGLContext(gl: RootState["gl"]) {
  gl.renderLists.dispose();
  gl.dispose();
  gl.forceContextLoss();
}
