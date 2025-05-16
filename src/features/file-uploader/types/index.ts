export type FileMeta = {
    source: Blob;
    title: string;
    album: string;
    author: string;
    alreadyExist: boolean;
    pictureUrl: string | undefined;
}

export type UploadFormType = {
    tracks: FileMeta[];
}