/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Book from '../../src/app/components/Book/Book.jsx';

const pickObject = {
  "tags": [
    "Offbeat",
    "Seriously good writing"
  ],
  "ageGroup": "Adult",
  "reviews": [
    {
      "reviewerName": "Benjamin Sapadin",
      "reviewerLocation": {
        "prefLabel": "Morris Park"
      },
      "text": "A fun, genre-bending read. An aging, competitive backgammon player is diagnosed with a life-threatening tumor and, upon it's removal, becomes convinced that he has psychic powers. The real star of this novel though is the game of backgammon, which I've never had any interest in until I read this book. I still have no idea how to play the game, but Lethem makes it seem like a heck of a good time. "
    }
  ],
  "book": {
    "author": "Jonathan Lethem",
    "catalogUrl": "http://browse.nypl.org/iii/encore/record/C__Rb21052853__Sa%20gambler%27s%20anatomy__Orightresult__U__X7?lang=eng&suite=def",
    "ebookUrl": "http://browse.nypl.org/iii/encore/record/C__Rb21109294__Sa%20gambler%27s%20anatomy__P0%2C2__Orightresult__U__X7?lang=eng&suite=def",
    "imageUrl": "http://imagesb.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9780385539906",
    "isbn": "9780385539913",
    "overdriveId": "2678726",
    "title": "A Gambler's Anatomy",
    "illustrator": "I am an illustrator",
    "translator": "I am a translator"
  }
};

describe('Book Component', () => {
  let component;

  describe('Default component without data', () => {
    it('should not render the Book component if the pick object prop is not defined', () => {
      component = mount(<Book />);
      expect(component.find('.book-item').length).to.equal(0);
    });

    it('should not render the Book component if the pick object prop is empty', () => {
      component = mount(<Book pick={{}} />);
    });
  });

  describe('Component with data', () => {
    before(() => {
      component = mount(
        <Book pick={pickObject} />
      );
    });

    it('should render the pick list item with proper tag classes', () => {
      const pickListElement = component.find('.book-item');
      expect(pickListElement.length).to.equal(1);
      expect(pickListElement.find('li').length).to.equal(1);
      expect(pickListElement.hasClass('offbeat')).to.equal(true);
      expect(pickListElement.hasClass('seriously-good-writing')).to.equal(true);
    });

    it('should render the pick title <h3> element with text', () => {
      const title = component.find('.book-item-title');
      expect(title.length).to.equal(1);
      expect(title.find('h3').length).to.equal(1);
      expect(title.find('h3').text()).to.equal(pickObject.book.title);
    });

    it('should render the pick author <p> element with text', () => {
      const author = component.find('.book-item-author');
      expect(author.length).to.equal(1);
      expect(author.find('p').length).to.equal(1);
      expect(author.find('p').text()).to.equal(pickObject.book.author);
    });

    it('should render the pick image <img /> element with empty ALT text', () => {
      const image = component.find('.book-item-image-box');
      expect(image.length).to.equal(1);
      expect(image.find('img').length).to.equal(1);
      expect(image.find('img').prop('src')).to.equal(pickObject.book.imageUrl);
      expect(image.find('img').prop('alt')).to.equal("");
    });

    it('should render the pick description <p> element with text', () => {
      const text = component.find('.book-item-description');
      expect(text.length).to.equal(1);
      expect(text.find('p').length).to.equal(1);
      expect(text.find('p').text()).to.equal(pickObject.reviews[0].text);
    });

    it('should render the catalog link <a> tag element with proper href value', () => {
      const linksWrapper = component.find('.book-item-catalog-links');
      expect(linksWrapper.length).to.equal(1);
      expect(linksWrapper.find('.catalog-url').length).to.equal(1);
      expect(linksWrapper.find('.catalog-url').text()).to.contain('Request Book');
      expect(linksWrapper.find('.catalog-url').prop('href')).to.equal(pickObject.book.catalogUrl);
    });

    it('should render the ebook link <a> tag element with proper href value', () => {
      const linksWrapper = component.find('.book-item-catalog-links');
      expect(linksWrapper.length).to.equal(1);
      expect(linksWrapper.find('.ebook-url').length).to.equal(1);
      expect(linksWrapper.find('.ebook-url').text()).to.contain('Request E-Book');
      expect(linksWrapper.find('.ebook-url').prop('href')).to.equal(pickObject.book.ebookUrl);
    });

    it('should render the pick translator <p> element with text', () => {
      const text = component.find('.book-item-translator');
      expect(text.length).to.equal(1);
      expect(text.find('p').length).to.equal(1);
      expect(text.find('p').text()).to.equal('Translated By: ' + pickObject.book.translator);
    });

    it('should render the pick illustrator <p> element with text', () => {
      const text = component.find('.book-item-illustrator');
      expect(text.length).to.equal(1);
      expect(text.find('p').length).to.equal(1);
      expect(text.find('p').text()).to.equal('Illustrated By: ' + pickObject.book.illustrator);
    });

    it('should assign a .withTranslatorIllustrator class if both translator and illustrator exist', () => {
      const bookWrapper = component.find('.book-item');
      expect(bookWrapper.hasClass('withTranslatorIllustrator')).to.equal(true);
    });
  });
});
