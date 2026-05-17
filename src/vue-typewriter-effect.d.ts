declare module "vue-typewriter-effect" {
  import { DefineComponent } from "vue";

  const VueTypewriterEffect: DefineComponent<{
    strings: string[];
    loop?: boolean;
    autoStart?: boolean;
    cursor?: boolean;
    speed?: number;
    startDelay?: number;
    backSpeed?: number;
    backDelay?: number;
    fadeOut?: boolean;
    fadeOutClass?: string;
    fadeOutDelay?: number;
    showCursor?: boolean;
    cursorChar?: string;
    attr?: string;
    html?: boolean;
    contentType?: "html" | "null";
  }>;

  export default VueTypewriterEffect;
}
