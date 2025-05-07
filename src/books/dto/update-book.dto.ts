export class UpdateBookDto {
  name?: string;
  authorIds?: number[] | string; // Allow both array and string
}
