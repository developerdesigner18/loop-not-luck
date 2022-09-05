const libraryData = require("./libraryData.json");

class Person {
  constructor(person) {
    this.personType = person.personType;
    this.caseNumber = person.caseNumber;
    this.photos = person.photos;
    this.information = person.information;
    this.createdAt = person.createdAt;
  }
}

class PhotoLibrary {
  constructor() {
    this.library = [...libraryData];
  }

  // Retrieve library
  getLibrary(institution) {
    let dataToSent = this.library;

    if (institution === "asylum") {
      let libraryData = [...this.library];
      dataToSent = libraryData.filter(
        (person) => person.personType === "asylumSeeker"
      );
    }

    return dataToSent;
  }

  // Add suspect when police arrests a criminal suspect
  addCriminalSuspect(suspect) {
    this.library.push(suspect);
    return "suspect record created successfully";
  }

  // Add asylum seeker
  addAsylumSeeker(asylumSeeker) {
    this.library.push(asylumSeeker);

    return "asylum seeker record created successfully";
  }

  // Review photos
  reviewPhotos(caseNumber) {
    const DAYS_WITHIN_PHOTOS_TO_REVIEW = 5;
    const addDays = (date, days) => {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    const foundSuspect = this.library.find(
      (suspect) => suspect.caseNumber === caseNumber
    );

    const takenOnWithAddedGraceDays = addDays(
      foundSuspect.photos.takenOn,
      DAYS_WITHIN_PHOTOS_TO_REVIEW
    );

    const allowPhotosReview =
      new Date(takenOnWithAddedGraceDays).getDay() <= new Date().getDay();

    if (!allowPhotosReview) {
      return `Photos must be reviewd within ${DAYS_WITHIN_PHOTOS_TO_REVIEW} days`;
    }
    foundSuspect.photos.areReviewed = true;
    return "Photos review completed";
  }
}

const photoLibrary = new PhotoLibrary();

// Add new suspect to library
const addSuspect = photoLibrary.addCriminalSuspect(
  new Person({
    personType: "criminalSuspect",
    caseNumber: "3",
    photos: {
      frontView:
        "https://img.freepik.com/premium-vector/cartoon-criminal-mugshot-police-station_70172-2077.jpg?w=2000",
      leftProfile:
        "https://img.freepik.com/premium-vector/cartoon-criminal-mugshot-police-station_70172-2077.jpg?w=2000",
      rightProfile:
        "https://img.freepik.com/premium-vector/cartoon-criminal-mugshot-police-station_70172-2077.jpg?w=2000",
      takenOn: "Mon Sep 01 2022 11:29:24 GMT+0530",
      areReviewed: false,
    },
    information: {
      cprNumber: "3",
      name: "Jaydeep",
      currentAddress: "Katargam",
      physicalDescription: {},
    },
    createdAt: "Mon Sep 01 2022 11:29:24 GMT+0530",
  })
);

console.log("🚀 ~ file: index.js ~ addSuspect", addSuspect);

// Review photos
const reviewPhotos = photoLibrary.reviewPhotos("1");
console.log("🚀 ~ file: index.js ~ reviewPhotos", reviewPhotos);

// Get photo library for police
const getLibraryForPolice = photoLibrary.getLibrary("police");

console.log("🚀 ~ file: index.js ~ getLibraryForPolice", getLibraryForPolice);

// Add new asylum seeker to library
const storeAsylumSeeker = photoLibrary.addAsylumSeeker(
  new Person({
    personType: "asylumSeeker",
    photos: {
      frontView:
        "https://www.amnesty.org/en/wp-content/uploads/2021/03/a3f0fdda796c9739113b6f951f7a91383a6b827b.jpg",
      leftProfile:
        "https://www.amnesty.org/en/wp-content/uploads/2021/03/a3f0fdda796c9739113b6f951f7a91383a6b827b.jpg",
      rightProfile:
        "https://www.amnesty.org/en/wp-content/uploads/2021/03/a3f0fdda796c9739113b6f951f7a91383a6b827b.jpg",
      takenOn: "Mon Sep 01 2022 11:29:24 GMT+0530",
    },
    information: {
      cprNumber: "3",
      name: "Pratiksha",
      currentAddress: "Surat",
      physicalDescription: {},
    },
    createdAt: "Mon Sep 01 2022 11:29:24 GMT+0530",
  })
);

console.log("🚀 ~ file: index.js ~ storeAsylumSeeker", storeAsylumSeeker);

// Get photo library for asylum
const getLibraryForAsylum = photoLibrary.getLibrary("asylum");

console.log("🚀 ~ file: index.js ~ getLibraryForAsylum", getLibraryForAsylum);
