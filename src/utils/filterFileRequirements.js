const formattedFilenameExt = (name) =>
  `.${name.split(".").pop().toLowerCase()}`;

const areRequirementsFulfilled = (requirements, file) =>
  requirements.maxSize >= file.size &&
  requirements.supportedFormats.includes(formattedFilenameExt(file.name));

export function filterFileRequirements(files, requirements) {
  let accepted = [];
  let rejected = [];
  Array.from(files).forEach((file) => {
    if (file) {
      if (areRequirementsFulfilled(requirements, file)) {
        accepted.push(file);
      } else {
        rejected.push(file);
      }
    }
  });
  return { accepted, rejected };
}
