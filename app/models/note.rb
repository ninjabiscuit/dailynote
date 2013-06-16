class Note < ActiveRecord::Base

  include PgSearch
  pg_search_scope :search, against: [:content],
    using: {tsearch: {dictionary: "english"}}

  def self.text_search(query)
    if query.present?
      search(query)
    else
      scoped
    end
  end

end
