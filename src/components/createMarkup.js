function makeid(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export function createMarkup(data) {
    return {
       __html: data 
    };
};

export function formatContent(content){
    let result;

    result = content.replace(/<h2/g, function() {
        return `<h2 id="${makeid(10)}"`;
    });

    result = result.replace(/<h3/g, function() {
        return `<h3 id="${makeid(10)}"`;
    });

    result = result.replace(/<h4/g, function() {
        return `<h4 id="${makeid(10)}"`;
    });
      
    return result
}