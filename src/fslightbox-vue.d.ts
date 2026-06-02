declare module 'fslightbox-vue' {
  import { DefineComponent } from 'vue';

  const FsLightbox: DefineComponent<{
    toggler: boolean;
    sources?: string[];
    types?: (string | null)[];
    type?: string;
    thumbs?: string[];
    slide?: number;
    loadOnlyCurrentOnly?: boolean;
  }>;

  export default FsLightbox;
}
