import PropTypes from "prop-types";

const ComicCard = ({ data  }) => {

  return (
    <div className=" w-full h-auto grid grid-cols-4 gap-4">
      {data.map((datal) => (
        <div key={datal.id} className="">
          <img
            className="w-80 h-96 bg-cover bg-no-repeat rounded-t-3xl"
            src={`${datal.thumbnail.path}.${datal.thumbnail.extension}`}
            alt={datal.name}
          />
          <div className="bg-red-500 h-12 w-full rounded-b-3xl flex items-center justify-center font-serif font-bold text-lg text-center">
            {datal.name}
          </div>
        </div>
      ))}
    </div>
  );
};

ComicCard.propTypes = {
  data: PropTypes.array,
};

export default ComicCard;
