class NoteSerializer < ActiveModel::Serializer
  attributes :id, :day, :content
end
