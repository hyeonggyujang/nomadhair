/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Slug = {
  _type: "slug";
  current?: string;
  source?: string;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type TimeValue =
  | "00:00"
  | "00:30"
  | "01:00"
  | "01:30"
  | "02:00"
  | "02:30"
  | "03:00"
  | "03:30"
  | "04:00"
  | "04:30"
  | "05:00"
  | "05:30"
  | "06:00"
  | "06:30"
  | "07:00"
  | "07:30"
  | "08:00"
  | "08:30"
  | "09:00"
  | "09:30"
  | "10:00"
  | "10:30"
  | "11:00"
  | "11:30"
  | "12:00"
  | "12:30"
  | "13:00"
  | "13:30"
  | "14:00"
  | "14:30"
  | "15:00"
  | "15:30"
  | "16:00"
  | "16:30"
  | "17:00"
  | "17:30"
  | "18:00"
  | "18:30"
  | "19:00"
  | "19:30"
  | "20:00"
  | "20:30"
  | "21:00"
  | "21:30"
  | "22:00"
  | "22:30"
  | "23:00"
  | "23:30";

export type Appointment = {
  _id: string;
  _type: "appointment";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  timeslot?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "timeslot";
  };
  stylist?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "stylist";
  };
  customer?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "customer";
  };
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  comment?: string;
};

export type Customer = {
  _id: string;
  _type: "customer";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
};

export type Stylist = {
  _id: string;
  _type: "stylist";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
};

export type Timeslot = {
  _id: string;
  _type: "timeslot";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  date?: string;
  duration?: Duration;
  reserved?: boolean;
};

export type Duration = {
  _type: "duration";
  start?: TimeValue;
  end?: TimeValue;
};
export declare const internalGroqTypeReferenceTo: unique symbol;

// Source: ./groq/groq.ts
// Variable: AVAILABLE_DATE_QUERY
// Query: *[_type=='timeslot'  && !(_id in *[_type=='appointment'].timeslot._ref)  && date >= now()]{  "id": _id,  date,}
export type AVAILABLE_DATE_QUERYResult = Array<{
  id: string;
  date: string;
}>;
// Source: ./groq/groq.ts
// Variable: AVAILABLE_TIMESLOT_QUERY
// Query: *[_type=='timeslot' && !(_id in *[_type=='appointment'].timeslot._ref) && date == ''  && dateTime(timeslot) >= dateTime(now())]{  "id": _id,  date,  timeslot,}
export type AVAILABLE_TIMESLOT_QUERYResult = Array<{
  id: string;
  date: string;
  timeslot: string;
}>;
// Variable: IS_TIMESLOT_RESERVED_QUERY
// Query: count(*[_type=='appointment'   && references('') ]) > 0
export type IS_TIMESLOT_RESERVED_QUERYResult = unknown;
// Variable: APPOINTMENT_QUERY
// Query: *[_type=='appointment'  && customer->_id == ''  && dateTime(timeslot->timeslot) >= dateTime(now())]{  "id":_id,  "timeslotId":timeslot->_id,  "date":timeslot->date,  "time":timeslot->timeslot,  address1,  address2,  city,  state,  zipCode,  comment,  customer->{"id": _id, firstName, lastName},  stylist->{"id": _id, firstName, lastName}}
export type APPOINTMENT_QUERYResult = Array<{
  id: string;
  timeslotId: string;
  date: string;
  time: string;
  address1: string;
  address2: string | undefined;
  city: string;
  state: string;
  zipCode: string;
  comment: string | undefined;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
  };
  stylist: {
    id: string;
    firstName: string;
    lastName: string;
  };
}>;
