export function filterFileRequirements(files, requirements) {
  let accepted = [];
  let rejected = [];
  for (var i = 0, file; (file = files[i]); i++) {
    if (file) {
      if (
        requirements.maxSize >= file.size &&
        requirements.supportedFormats.includes(
          `.${file.name.split(".").pop().toLowerCase()}`
        )
      ) {
        accepted.push(file);
      } else {
        rejected.push(file);
      }
    }
  }

  return { accepted, rejected };
}
